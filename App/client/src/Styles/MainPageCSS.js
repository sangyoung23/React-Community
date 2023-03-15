import styled from "@emotion/styled";

const MainDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  strong {
    font-size: 1.2rem;
    margin-right: 10px;
  }
  input {
    padding: 5px 20px;
    border-radius: 15px;
    border: 1px solid black;
    height: 100%;
    &:active,
    &:focus {
      outline: none;
    }
  }
  @media (max-width: 756px) {
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    strong {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
`;

const FooterDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  button {
    width: auto;
    border-radius: 15px;
    padding: 5px 10px;
    font-weight: bold;
    cursor: pointer;
  }
`;
export { MainDiv, FooterDiv };
