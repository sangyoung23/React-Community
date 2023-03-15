import styled from "@emotion/styled";

const ListDiv = styled.div`
  padding: 1rem 0;
  max-width: 756px;
  margin: 0 auto;
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const Listitem = styled.div`
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

export { ListDiv, Listitem };
