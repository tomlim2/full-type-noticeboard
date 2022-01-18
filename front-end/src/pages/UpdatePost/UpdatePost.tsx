import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import "./UpdatePost.scss";

const UpdatePost = () => {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const path =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  useEffect(() => {
    fetch(`http://localhost:5000/api/post/${path}`)
      .then((res) => res.json())
      .then((data) => {
        setTitleInput(data.title);
        setContentInput(data.content);
      });
  }, []);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: titleInput, content: contentInput }),
  };

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch(
        `http://localhost:5000/api/post/${path}`,
        requestOptions
      );
      if (res) alert("글이 수정되었습니다!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <Card pageName="UpdatePost">
        <div className="section header">
          <h2>글 수정하기</h2>
        </div>
        <div className="section">
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
        </div>
        <div className="section">
          <Button options={{ type: "submit" }}>수정하기</Button>
          <Button options={{ linkTo: "/" }}>목록으로</Button>
        </div>
      </Card>
    </form>
  );
};

export default UpdatePost;
