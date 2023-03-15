import styled from "@emotion/styled";

const DetailtDiv = styled.div`
  padding: 1rem 0;
  max-width: 756px;
  margin: 0 auto;
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const Detailitem = styled.div`
  width: 100%;
  height: auto;
  min-width: 120px;
  margin: 5vh 0;
  padding: 20px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  a {
    color: black;
    text-decoration: none;
  }
  .time {
    text-align: right;
    color: #ccc;
  }
`;

const SpinnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: calc(100vh - 2rem);
`;

const DetailButtonDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 10px;
    padding: 5px 10px;
    color: black;
    background-color: white;
    border: 1px solid black;
    &:hover {
      background-color: black;
      border: 1px solid white;
      color: white;
    }
  }
  .deleteButton {
    margin-left: 15px;
    border: 1px solid red;
    background-color: white;
    color: red;
    &:hover {
      background-color: black;
      border: 1px solid red;
      color: white;
    }
  }
`;

export { Detailitem, DetailtDiv, SpinnerDiv, DetailButtonDiv };
