import config from "../config.js";
import mysql from "mysql";

// MySQL 데이터베이스에 대한 연결 풀을 생성합니다.
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// 프로세스가 종료될 때 데이터베이스 연결을 종료합니다.
process.on("exit", (code) => {
  pool.end(function (err) {
    if (err) {
      return console.log("error in closing db connection", err);
    }
    console.log("Db connection closed");
    process.exit(code);
  });
});

// 데이터베이스에 새 게시물을 추가하는 함수입니다.
export function createPostInDB(title, body, callback) {
  const query =
    "INSERT INTO posts (title, body, created_date) VALUES (?, ?, CURDATE())";
  pool.query(query, [title, body], callback);
}

// 데이터베이스에서 모든 게시물을 가져오는 함수입니다.
export function getAllPostsFromDB(callback) {
  const query =
    "SELECT id, title, created_date FROM posts ORDER BY created_date DESC";
  pool.query(query, callback);
}

// 데이터베이스에서 특정 ID의 게시물을 가져오는 함수입니다.
export function getPostByIdFromDB(id, callback) {
  const query = "SELECT * FROM posts WHERE id = ?";
  pool.query(query, [id], callback);
}

export function findRelatedPosts(postId, callback) {
  // 주어진 게시물과 관련된 단어를 데이터베이스에서 조회합니다.
  pool.query(
    "SELECT word FROM word_frequency WHERE post_id = ?",
    [postId],
    (error, results) => {
      if (error) {
        return callback(error);
      }

      const words = results.map((result) => result.word);

      // 데이터베이스에서 전체 게시물의 수를 조회합니다.
      pool.query(
        "SELECT COUNT(*) as total_posts FROM posts",
        [],
        (error, results) => {
          if (error) {
            return callback(error);
          }

          const totalPosts = results[0].total_posts;

          // 각 단어에 대해, 그 단어를 포함하는 게시물의 수를 계산하는 프로미스를 생성합니다.
          const relatedPostQueries = words.map((word) => {
            return new Promise((resolve, reject) => {
              pool.query(
                "SELECT COUNT(*) as word_count FROM word_frequency WHERE word = ?",
                [word],
                (error, results) => {
                  if (error) {
                    return reject(error);
                  }

                  const wordCount = results[0].word_count;

                  // 단어가 전체 게시물의 60% 이상에서 등장하면, 그 단어를 포함하는 게시물의 id를 조회합니다.
                  if (wordCount / totalPosts > 0.6) {
                    pool.query(
                      "SELECT post_id FROM word_frequency WHERE word = ? AND post_id != ?",
                      [word, postId],
                      (error, results) => {
                        if (error) {
                          return reject(error);
                        }

                        const relatedPostIds = results.map(
                          (result) => result.post_id
                        );
                        resolve(relatedPostIds);
                      }
                    );
                  } else {
                    resolve([]);
                  }
                }
              );
            });
          });

          // 모든 프로미스를 실행하고, 결과를 합칩니다.
          Promise.all(relatedPostQueries)
            .then((results) => {
              // 결과 배열을 평탄화하고, 중복을 제거합니다.
              const relatedPostIds = [...new Set([].concat(...results))];
              callback(null, relatedPostIds);
            })
            .catch(callback);
        }
      );
    }
  );
}
