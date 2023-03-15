const mongoose = require("mongoose");

// Schema 생성 간단한 title과 content만 생성
const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    image: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    repleNum: {
      type: Number,
      default: 0,
    },
    //collation으로 데이터베이스 collation 이름 변경
  },
  //timestamps 디비에 다큐먼트가 생성된 시간과 수정된 시간을 나타낸다.
  { collection: "posts", timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

// server에서 사용하기 위한 export
module.exports = { Post };
