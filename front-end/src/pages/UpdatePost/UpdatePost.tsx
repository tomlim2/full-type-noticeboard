import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card";
import "./UpdatePost.scss";

const UpdatePost = () => {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const path =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  useEffect(() => {
    getSinglePost(path);
  }, []);

  const getSinglePost = async (pathParams: string) => {
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/post/${pathParams}`);
      const data = await res.json();
      setTitleInput(data.title);
      setContentInput(data.content);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: titleInput, content: contentInput }),
  };

  const submitHandler = async (event: any) => {
    try {
      event.preventDefault();
      const res = await fetch(
        `http://localhost:5000/api/post/${path}`,
        requestOptions
      );
      const data = await res.json();

      if (res) alert("글이 수정되었습니다!");
      navigate(`/post/${data.__id}`);
    } catch (error) {
      alert("수정 요청이 실패하였습니다. 잠시 후 다시 시도해주세요");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <Card pageName="UpdatePost">
        <div className="section header">
          {!error && !loading && <h2>글 수정하기</h2>}
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
          <Button options={{ type: "submit" }}>수정하기</Button>
          <Button options={{ linkTo: "/" }}>목록으로</Button>
        </div>
      </Card>
    </form>
  );
};

export default UpdatePost;
