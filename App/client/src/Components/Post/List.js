import React from "react";
import { ListDiv, Listitem } from "../../Styles/ListCSS";
import { Link } from "react-router-dom";

// 시간을 보기 좋게 변경 해주는 라이브러리
import moment from "moment";
// 한국시간 기준으로 설정해주는 코드
import "moment/locale/ko";

function List(props) {
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do  hh:mm ") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do  hh:mm ");
    }
  };
  return (
    <ListDiv>
      {props.PostList.map((post, idx) => {
        return (
          <Listitem key={idx}>
            <Link to={`/post/${post.postNum}`}>
              <h3>{post.title}</h3>
              <p>{`닉네임 : ${post.author.displayName}`}</p>
              <p>{post.content}</p>
              <p className="time">{SetTime(post.createdAt, post.updatedAt)}</p>
            </Link>
          </Listitem>
        );
      })}
    </ListDiv>
  );
}

export default List;
