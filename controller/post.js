import {
  createPostInDB,
  getAllPostsFromDB,
  getPostByIdFromDB,
  findRelatedPosts,
} from "../data/post.js";

// 새 게시물을 만드는 컨트롤러입니다.
export function createPost(req, res) {
  const { title, body } = req.body;

  createPostInDB(title, body, (error, result) => {
    if (error) {
      res.status(500).send("Error in creating post");
    } else {
      // 게시물이 성공적으로 생성된 경우, 생성된 게시물의 ID를 반환합니다.
      res.status(200).send(`Post created with ID: ${result.insertId}`);
    }
  });
}

// 모든 게시물을 가져오는 컨트롤러입니다.
export function getAllPosts(req, res) {
  getAllPostsFromDB((error, results) => {
    if (error) {
      res.status(500).send("Error in fetching posts");
    } else {
      res.status(200).json(results);
    }
  });
}

// 특정 ID의 게시물을 가져오는 컨트롤러입니다.
export function getPostById(req, res) {
  const { id } = req.params;

  getPostByIdFromDB(id, (error, results) => {
    if (error) {
      res.status(500).send("Error in fetching post");
    } else {
      const post = results[0];

      findRelatedPosts(id, (error, results) => {
        if (error) {
          res.status(500).send("Error in fetching related posts");
        } else {
          const relatedPosts = results;
          res.status(200).json({ ...post, relatedPosts });
        }
      });
    }
  });
}
