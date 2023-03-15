import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";

function ImageUpload(props) {
  const FileUpload = (e) => {
    // new FormData()를 이용해서 생성하고 append를 이용해서 key/value 값으로 서버로 전달
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post("/api/post/image/upload", formData).then((res) => {
      props.setImage(res.data.filePath);
    });
  };

  return (
    <div>
      <Form.Control
        type="file"
        accept="image/*"
        src={props.Image}
        onChange={(e) => FileUpload(e)}
      />
    </div>
  );
}

export default ImageUpload;
