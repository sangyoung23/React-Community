import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import { useNavigate } from "react-router-dom";

import { LoginDiv } from "../../Styles/UserCSS";

function Login() {
  const [Email, setEmail] = useState("");
  const [Pw, setPw] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const SignInFuc = async (e) => {
    e.preventDefault();
    if (!(Email && Pw)) {
      return alert("모든 값을 채워주세요");
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(Email, Pw);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMsg("존재하지 않는 이메일입니다.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setErrorMsg("로그인이 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
    }, [5000]);
  }, [ErrorMsg]);

  return (
    <LoginDiv>
      <form>
        <label>이메일</label>
        <input
          type="email"
          value={Email}
          required
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={Pw}
          required
          onChange={(e) => setPw(e.currentTarget.value)}
        />
        {ErrorMsg != "" && <p>{ErrorMsg}</p>}
        <button onClick={(e) => SignInFuc(e)}>로그인</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Login;
