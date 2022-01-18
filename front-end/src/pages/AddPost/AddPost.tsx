import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./AddPost.scss";

const AddPost = () => {
  const navigate = useNavigate();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
              placeholder="제목을 입력해주세요!"
            />
          </div>
          <div>
            <label>내용</label>
            <br />
            <textarea className="content" placeholder="내용을 입력해주세요!" />
          </div>
          <Button options={{ type: "submit" }}>
            만들기
          </Button>
          <Button options={{ linkTo: "/" }}>
            목록으로
          </Button>
        </form>
      </div>
      <div className="section"></div>
    </Card>
  );
};

export default AddPost;
