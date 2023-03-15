import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice";
import firebase from "./firebase";

import PostArea from "./Components/Post/PostArea";
import Heading from "./Components/Heading";
import MainPage from "./Components/MainPage";
import Upload from "./Components/Post/Upload";
import Edit from "./Components/Post/Edit";

import Login from "./Components/User/Login";
import Register from "./Components/User/Register";

function App() {
  // 값을 보내는 dispatch
  const dispatch = useDispatch();
  // store에 담긴 reducer를 불러오는 selector
  const user = useSelector((state) => state.user);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  useEffect(() => {
    // firebase.auth().signOut();
  }, []);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<PostArea />} />
        <Route path="/edit/:postNum" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
