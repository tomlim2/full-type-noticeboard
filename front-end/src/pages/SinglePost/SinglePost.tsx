import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../../models/posts";
import Card from "../../components/Card";
import "./SinglePost.css";

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
  
  return (
    <Card>
      <div className="section-post header">
        <div className="infos">
          <div>글번호: {post && post.postNumber} </div>
          <div>작성자: {post && post.writer} </div>
          <div>작성일: {post && post.editedAt}</div>
        </div>
        제목: {post && post.title}
      </div>
      <div className="section-post content">
        내용
        <p>{post && post.content}</p>
      </div>
      <div className="section-post">
        <button>수정</button>
        <button onClick={deletePost}>삭제</button>
        <button onClick={() => navigate("/")}>목록으로</button>
      </div>
    </Card>
  );
};

export default SinglePost;
