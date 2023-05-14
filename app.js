// Express와 관련된 모듈을 불러옵니다.
import express from "express";
import postRoutes from "./router/post.js";

const app = express();

// JSON 형식의 요청 본문을 파싱하기 위한 미들웨어를 사용합니다.
app.use(express.json());

// 게시물 관련 라우터를 사용합니다.
app.use(postRoutes);

// 8000번 포트에서 서버를 시작합니다.
app.listen(8000, () => console.log("Server running on port 8000"));
