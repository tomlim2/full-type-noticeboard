import React from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../models/posts";
import "./PostItem.scss";

const PostItem: React.FC<{ onClickAuthorName: any; post: Post }> = ({
  onClickAuthorName,
  post,
}) => {
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
        <div>글번호: {post.postNumber}</div>
        <div>
          작성자:{" "}
          <span
            className="author"
            onClick={() => onClickAuthorName(post.author)}
          >
            {post.author}
          </span>
        </div>
        <div>작성일: {formatDate(post.editedAt)}</div>
      </div>
      <div
        className="title"
        onClick={() => navigate(`post/${post.__id}`)}
      >
        {post.title}
      </div>
    </li>
  );
};

export default PostItem;
