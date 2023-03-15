const express = require("express");
const path = require("path");
// 몽고디비를 보다 편리하게 사용할 수 있는 몽구스 라이브러리
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8080;
const config = require("./server/config/key");

// app.use로 build 되어 사용할 static 폴더 지정
app.use(express.static(path.join(__dirname, "./client/build")));
app.use("/image", express.static("./image"));
// client에서 보내는 body에 대한 값을 추적하기 위한 코드
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/post", require("./server/Router/post"));
app.use("/api/user", require("./server/Router/user"));
app.use("/api/reple", require("./server/Router/reple"));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    // then, catch로 연결 에러 핸들링 처리
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log("Connecting MongoDB...");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

// res.sendFile로 build된 index.html 보내주기 , 보내는 과정에서 path.join으로 server 파일의 경로 같이 보내기
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// 유저가 어떠한 라우팅 규칙으로 들어오던 build/index.html 파일을 보여주기 위해 자바스크립트 정규식 표현으로 * 모든 것 입력
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
