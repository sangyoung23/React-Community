import React, { useState, useEffect } from "react";
import List from "./Post/List";
import axios from "axios";

import { MainDiv, FooterDiv } from "../Styles/MainPageCSS";

import { DropdownButton, Dropdown } from "react-bootstrap";

function MainPage() {
  const [PostList, setPostList] = useState([]);
  const [Sort, setSort] = useState("최신순");
  const [SearchTerm, setSearchTerm] = useState("");
  const [Skip, setSkip] = useState(0);
  const [LoadMore, setLoadMore] = useState(true);

  const getLoadMore = () => {
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: Skip,
    };
    axios
      .post("api/post/list", body)
      .then((res) => {
        setPostList([...PostList, ...res.data.postList]);
        setSkip(Skip + res.data.postList.length);
        if (res.data.postList.length < 5) {
          setLoadMore(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPostList = () => {
    setSkip(0);
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: 0,
    };
    axios
      .post("api/post/list", body)
      .then((res) => {
        setPostList([...res.data.postList]);
        setSkip(res.data.postList.length);
        if (res.data.postList.length < 5) {
          setLoadMore(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPostList();
  }, [Sort]);

  const SearchHandler = () => {
    getPostList();
  };

  return (
    <>
      <MainDiv>
        <DropdownButton variant="outline-secondary" title={Sort}>
          <Dropdown.Item onClick={() => setSort("최신순")}>
            최신순
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("인기순")}>
            댓글순
          </Dropdown.Item>
        </DropdownButton>
        <div>
          <strong>Search</strong>
          <input
            type="text"
            vlaue={SearchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) SearchHandler();
            }}
          />
        </div>
      </MainDiv>
      <List PostList={PostList} />
      <FooterDiv>
        {LoadMore && <button onClick={() => getLoadMore()}>더 불러오기</button>}
      </FooterDiv>
    </>
  );
}

export default MainPage;
