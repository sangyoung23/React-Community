var express = require("express");
var router = express.Router();
const multer = require("multer");

const { Post } = require("../Model/Post");
const { Counter } = require("../Model/Counter");
const { User } = require("../Model/User");

// client에서 보낸 api 요청을 받는 코드
router.post("/submit", (req, res) => {
  // client에서 보낸 body 값을 temp 변수에 지정
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  // Counter 콜렉션에서 name: "counter"인 애들을 찾아서 temp 변수를 통해서 posts 모델의 postNum에 집어넣어준다.
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      User.findOne({ uid: req.body.uid })
        .exec()
        .then((userInfo) => {
          temp.author = userInfo._id;
          // new 명령어를 통해서 Model안에 들어갈 데이터를 정의해준다.
          // save 명령어를 통해서 저장
          const CommunityPost = new Post(temp);
          CommunityPost.save().then(() => {
            // 몽고 디비에서 하나의 다큐먼트를 업데이트 하는 명령어 , 두개의 query를 받는다 첫번째 쿼리는 어떤 다큐먼트를 업데이트 시킬지, 두번째는 어떻게 업데이트 시킬지
            // query문에서 증가시키는 코드는 $inc를 통해 가능하다.
            Counter.updateOne(
              { name: "counter" },
              { $inc: { postNum: 1 } }
            ).then(() => {
              res.status(200).json({ success: true });
            });
          });
        });
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
});

// submit에 들어간 데이터를 받는 서버쪽 코드
router.post("/list", (req, res) => {
  let sort = {};
  if (req.body.sort === "최신순") {
    sort.createdAt = -1;
  } else {
    // 인기순
    sort.repleNum = -1;
  }
  //  find() 몽고디비에서 document를 찾는 명령어
  Post.find({
    $or: [
      { title: { $regex: req.body.searchTerm } },
      { content: { $regex: req.body.searchTerm } },
    ],
  })
    //유저정보 불러오기
    .populate("author")
    // sort()를 사용해서 최신순 인기순 정렬
    .sort(sort)
    .skip(req.body.skip)
    .limit(5) // 한번에 찾을 doc 갯수
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
});

router.post("/detail", (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    //유저정보 불러오기
    .populate("author")
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true, post: doc });
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
});

router.post("/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
});

router.post("/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});

module.exports = router;
