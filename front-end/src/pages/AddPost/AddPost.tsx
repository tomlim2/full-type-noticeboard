import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../atoms/state";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./AddPost.scss";

const AddPost = () => {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titleInput,
      content: contentInput,
      author: userInfo.username,
    }),
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (titleInput === "" || contentInput === "") {
      return alert("제목 혹은 내용이 비어있습니다!");
    }

    fetch(`http://localhost:5000/api/post/`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.__id);
        setTitleInput("");
        setContentInput("");
        alert("새로운 글이 생성되었습니다!");
        navigate(`/post/${data.__id}`);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <Card pageName="AddPost">
        <div className="section header">
          <h2>글 추가하기</h2>
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
          <Button options={{ type: "submit" }}>만들기</Button>
          <Button options={{ linkTo: "/" }}>목록으로</Button>
        </div>
      </Card>
    </form>
  );
};

export default AddPost;
