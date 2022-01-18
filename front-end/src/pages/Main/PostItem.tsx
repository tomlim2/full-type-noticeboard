import React from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../models/posts";
import "./PostItem.scss";

const PostItem: React.FC<{ post: Post }> = (props) => {
  const navigate = useNavigate();

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
    <li className="postItem">
      <div className="info">
        <div>글번호: {props.post.postNumber}</div>
        <div>작성자: <span className="author">{props.post.author}</span></div>
        <div>작성일: {formatDate(props.post.editedAt)}</div>
      </div>
      <div className="title" onClick={() => navigate(`post/${props.post.__id}`)}>
        {props.post.title}
      </div>
    </li>
  );
};

export default PostItem;
