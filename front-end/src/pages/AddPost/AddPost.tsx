import React, { useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./AddPost.scss";

const AddPost = () => {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: titleInput, content: contentInput }),
  };

  const submitHandler = (event) => {
    event.preventDefault();

    console.log(titleInput);

    fetch(`http://localhost:5000/api/post/`, requestOptions).then(() =>
      alert("새로운 글이 생성되었습니다!")
    );
  };

  return (
    <Card pageName="AddPost">
      <div className="section header">
        <h2>글 추가하기</h2>
      </div>
      <div className="section">
        <form onSubmit={submitHandler}>
          <div>
            <label>글제목</label>
            <br />
            <input
              className="title"
              type="text"
              value={titleInput}
              onChange={(event) => setTitleInput(event.target.value)}
              placeholder="제목을 입력해주세요!"
            />
          </div>
          <div>
            <label>내용</label>
            <br />
            <textarea
              className="content"
              value={contentInput}
              onChange={(event) => setContentInput(event.target.value)}
              placeholder="내용을 입력해주세요!"
            />
          </div>
          <Button options={{ type: "submit" }}>만들기</Button>
          <Button options={{ linkTo: "/" }}>목록으로</Button>
        </form>
      </div>
      <div className="section"></div>
    </Card>
  );
};

export default AddPost;
