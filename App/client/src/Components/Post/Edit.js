import React, { useState, useEffect } from "react";
import { UploadButtonDiv, UploadForm, UploadDiv } from "../../Styles/UploadCSS";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import axios from "axios";

function Edit() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState(PostInfo.image);

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          setPostInfo(res.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(PostInfo.title);
    setContent(PostInfo.content);
    setImage(PostInfo.image);
  }, [PostInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요");
    }
    // 서버로 보내줄 body에 제목과 내용을 담아준다.
    let body = {
      title: Title,
      content: Content,
      postNum: params.postNum,
      image: Image,
    };
    axios
      .post("/api/post/edit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 수정이 완료되었습니다.");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("글 수정이 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <UploadDiv>
        <UploadForm>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={Title || ""}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <ImageUpload Image={Image} />
          <label htmlFor="content">내용</label>
          <textarea
            value={Content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
          />
          <UploadButtonDiv>
            <button
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              제출
            </button>
            <button
              className="cancel"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              취소
            </button>
          </UploadButtonDiv>
        </UploadForm>
      </UploadDiv>
    </div>
  );
}

export default Edit;
