import React from "react";
import Post from "../../models/posts";
import "./PostItem.css";

const PostItem: React.FC<{ post: Post }> = (props) => {
  return (
    <li className="post-item">
      <div>글번호: {props.post.postNumber}</div>
      <div>제목: {props.post.title}</div>
      <div>작성자: {props.post.writer}</div>
      <div>작성일:{props.post.editedAt}</div>
    </li>
  );
};

export default PostItem;
