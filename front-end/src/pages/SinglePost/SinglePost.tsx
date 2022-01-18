import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../../models/posts";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./SinglePost.scss";

const SinglePost = () => {
  const [post, setPost] = useState<Post>();
  const location = useLocation();
  const navigate = useNavigate();
  const path =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  useEffect(() => {
    fetch(`http://localhost:5000/api/post/${path}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      })
      .catch(() => navigate("/404"));
  }, []);

  const deletePost = () => {
    fetch(`http://localhost:5000/api/post/${path}`, { method: "DELETE" })
      .then(() => alert("해당 글이 삭제되었습니다!"))
      .then(() => navigate("/"));
  };

  const formatDate = (date) => {
    const getDate = new Date(date);
    return (
      getDate.getFullYear() +
      " / " +
      (getDate.getMonth() + 1) +
      " / " +
      getDate.getDate()
    );
  };

  return (
    <Card pageName="SinglePost">
      <div className="section header">
        <div>
          제목
          <h1>{post && post.title}</h1>
        </div>
      </div>
      <div className="section body">
        <div className="infos">
          <div className="info">
            글번호
            <span className="item">{post && post.postNumber}</span>
          </div>
          <div className="info author">
            작성자
            <span className="item">{post && post.author}</span>
          </div>
          <div className="info">
            작성일
            <span className="item">{post && formatDate(post.editedAt)}</span>
          </div>
        </div>
        <div className="content">
          내용 <br />
          <p>{post && post.content}</p>
        </div>
      </div>
      <div className="section">
        <Button options={{ linkTo: `/post/update/${path}` }}>
          이 글 수정하기
        </Button>
        <Button options={{ onClick: deletePost }}>삭제하기</Button>
        <Button options={{ linkTo: "/" }}>목록으로</Button>
      </div>
    </Card>
  );
};

export default SinglePost;
