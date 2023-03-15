const mongoose = require("mongoose");

// Schema 생성 간단한 title과 content만 생성
const counterSchema = new mongoose.Schema(
  {
    name: String,
    postNum: Number,
    userNum: Number,
    //collation으로 데이터베이스 collection 이름 변경
  },
  { collection: "counter" }
);

const Counter = mongoose.model("Counter", counterSchema);

// server에서 사용하기 위한 export
module.exports = { Counter };
