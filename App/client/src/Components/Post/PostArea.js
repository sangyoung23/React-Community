import React, { useEffect, useState } from "react";
import Detail from "./Detail";
import axios from "axios";
import RepleArea from "../Reple/RepleArea";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { SpinnerDiv } from "../../Styles/PostDetailCSS";
function PostArea() {
  const [PostInfo, setPostInfo] = useState([]);
  const [Flag, setFlag] = useState(false);

  let params = useParams();

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
  return (
    <div>
      {Flag ? (
        <>
          <Detail PostInfo={PostInfo} />
          <RepleArea postId={PostInfo._id} />
        </>
      ) : (
        <SpinnerDiv>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerDiv>
      )}
    </div>
  );
}

export default PostArea;
