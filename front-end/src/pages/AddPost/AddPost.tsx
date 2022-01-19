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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    if (titleInput === "" || contentInput === "") {
      return alert("제목 혹은 내용이 비어있습니다!");
    }

    createPost();
  };

  const createPost = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titleInput,
          content: contentInput,
          author: userInfo.username,
        }),
      };

      const res = await fetch(
        `http://localhost:5000/api/post/`,
        requestOptions
      );
      const data = await res.json();

      alert("새로운 글이 생성되었습니다!");
      navigate(`/post/${data.__id}`);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      setTitleInput("");
      setContentInput("");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <Card pageName="AddPost">
        <div className="section header">
          {!error && !loading && <h2>글 추가하기</h2>}
          {loading && <div>글을 불러오는 중입니다</div>}
          {error && <div>글을 불러올 수 없습니다</div>}
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
