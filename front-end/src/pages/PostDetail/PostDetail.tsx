import React, { useState, useEffect } from "react";
import "./PostDetail.css";

const PostDetail = () => {
//   const [post, setPost] = useState({});

//   useEffect(() => {
//     fetch("http://localhost:5000/api/post/123")
//       .then((res) => res.json())
//       .then((data) => setPost(data));
//   }, []);
//   console.log(post)
  return (
    <div className="post-detail">
      글번호:123 / 제목:hihi / 내용:why / 작성자:meme / 작성일:createdAt
    </div>
  );
};

export default PostDetail;
