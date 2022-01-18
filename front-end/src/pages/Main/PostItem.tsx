import React from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../models/posts";
import "./PostItem.scss";

const PostItem: React.FC<{ post: Post }> = (props) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const getDate = new Date(date)
    return getDate.getFullYear()+' / '+(getDate.getMonth()+1)+' / '+getDate.getDate()
  }

  return (
    <li
      onClick={() => navigate(`post/${props.post.__id}`)}
      className="postItem"
    >
      <div>글번호: {props.post.postNumber}</div>
      <div>제목: {props.post.title}</div>
      <div>작성자: {props.post.writer}</div>
      <div>작성일: {formatDate(props.post.editedAt)}</div>
    </li>
  );
};

export default PostItem;
