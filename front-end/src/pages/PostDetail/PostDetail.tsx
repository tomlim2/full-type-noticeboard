import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Post from "../../models/posts";
import "./PostDetail.css";

const PostDetail = () => {
  const [post, setPost] = useState<Post>();
  const location = useLocation();
  const path =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
    console.log(location)
  useEffect(() => {
    fetch(`http://localhost:5000/api/post/${path}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);
  console.log(post);
  return (
    <div className="post-detail">
      글번호:{post&&post.postNumber} / 제목:{post&&post.title} / 내용:{post&&post.content} /
      작성자:{post&&post.writer} / 작성일:{post&&post.editedAt}
    </div>
  );
};

export default PostDetail;
