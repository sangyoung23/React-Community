import React, { useState } from "react";
import firebase from "../../firebase";
import axios from "axios";
import { LoginDiv } from "../../Styles/UserCSS";
import { useNavigate } from "react-router-dom";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Pw, setPw] = useState("");
  const [PwConfirm, setPwConfirm] = useState("");
  const [Flag, setFlag] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");

  let navigate = useNavigate();

  //회원가입 함수
  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    // 회원가입 유효성 검사
    if (!(Name && Email && Pw && PwConfirm)) {
      return alert("모든 값을 입력해주세요");
    }
    if (!NameCheck) {
      return alert("닉네임 중복검사를 해주세요");
    }
    // 유효성 검사가 완료되면 회원가입 진행
    // async 를 이용하여 회원가입이 완료되는 동안에는 잠깐 멈추도록 처리
    let createUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, Pw);

    // 유저 Name도 아래의 함수를 통해 넣어준다.
    await createUser.user.updateProfile({
      displayName: Name,
    });

    console.log(createUser);
    let body = {
      email: createUser.user.multiFactor.user.email,
      displayName: createUser.user.multiFactor.user.displayName,
      uid: createUser.user.multiFactor.user.uid,
    };
    axios.post("/api/user/register", body).then((res) => {
      setFlag(false);
      if (res.data.success) {
        navigate("/login");
      } else {
        alert("회원가입이 실패하였습니다.");
      }
    });
  };

  const NameCheckFunc = (e) => {
    e.preventDefault();
    if (!Name) {
      return alert("닉네임을 입력해주세요");
    }

    let body = {
      dispalyName: Name,
    };

    axios.post("/api/user/namecheck", body).then((response) => {
      if (response.data.success) {
        if (response.data.check) {
          setNameCheck(true);
          setNameInfo("사용가능한 닉네임입니다.");
        } else {
          setNameInfo("중복된 닉네임입니다.");
        }
      }
    });
  };

  return (
    <LoginDiv>
      <form>
        <label>닉네임</label>
        <input
          type="name"
          value={Name}
          disabled={NameCheck}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        {NameInfo}
        <button onClick={(e) => NameCheckFunc(e)}>닉네임 중복검사</button>
        <label>이메일</label>
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={Pw}
          minLength={8}
          onChange={(e) => setPw(e.currentTarget.value)}
        />
        <span className="password">
          비밀번호는 영문 포함 6자리 이상 입력해주세요.
        </span>
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={PwConfirm}
          minLength={8}
          onChange={(e) => setPwConfirm(e.currentTarget.value)}
        />
        <span className="password">비밀번호를 한번 더 입력해주세요.</span>
        <button disabled={Flag} onClick={(e) => RegisterFunc(e)}>
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
