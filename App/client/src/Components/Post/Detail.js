import axios from "axios";
import React, { useEffect } from "react";
import {
  DetailtDiv,
  Detailitem,
  DetailButtonDiv,
} from "../../Styles/PostDetailCSS";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import moment from "moment";
import "moment/locale/ko";

function Detail(props) {
  let params = useParams();
  let navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(props.PostInfo);
  }, [props.PostInfo]);

  const DeleteHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까 ?")) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post("/api/post/delete", body)
        .then((res) => {
          if (res.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("게시글 삭제에 실패하였습니다.");
        });
    }
  };

  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do  hh:mm ") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do  hh:mm ");
    }
  };

  console.log(props);

  return (
    <DetailtDiv>
      <Detailitem>
        <h3>{props.PostInfo.title}</h3>
        <strong>{props.PostInfo.author.displayName}</strong>
        {props.PostInfo.image ? (
          <img
            src={`http://localhost:8080/${props.PostInfo.image}`}
            alt=""
            style={{ width: "100%", heigth: "auto" }}
          />
        ) : null}
        <p>{props.PostInfo.content}</p>
        <p className="time">
          {SetTime(props.PostInfo.createdAt, props.PostInfo.updatedAt)}
        </p>
      </Detailitem>
      {user.uid === props.PostInfo.author.uid && (
        <DetailButtonDiv>
          <Link to={`/edit/${props.PostInfo.postNum}`}>
            <button className="editButton">수정</button>
          </Link>
          <button className="deleteButton" onClick={() => DeleteHandler()}>
            삭제
          </button>
        </DetailButtonDiv>
      )}
    </DetailtDiv>
  );
}

export default Detail;
