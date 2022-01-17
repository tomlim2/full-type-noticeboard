import React from "react";
import "./PostItem.css";

const PostItem = () => {
  return (
    <li className="post-item">
      <div>글번호: 1</div>
      <div>제목: 코뿔소는 기침이 심합니다</div>
      <div>작성자:폴</div>
      <div>작성일:2022-1-17</div>
    </li>
  );
};

export default PostItem;
