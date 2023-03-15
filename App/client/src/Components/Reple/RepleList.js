import React, { useEffect, useState } from "react";
import axios from "axios";
import RepleContent from "./RepleContent";
import { RepleListDiv } from "../../Styles/RepleCSS";

function RepleList(props) {
  const [repleList, setrepleList] = useState([]);
  useEffect(() => {
    let body = {
      postId: props.postId,
    };
    axios.post("/api/reple/getReple", body).then((res) => {
      if (res.data.success) {
        setrepleList([...res.data.repleList]);
      }
    });
  }, []);
  return (
    <RepleListDiv>
      {repleList.map((reple, idx) => {
        return <RepleContent reple={reple} key={idx} />;
      })}
    </RepleListDiv>
  );
}

export default RepleList;
