import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import "./Main.css";

const limit = 3;

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/api/post")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="main">
      <div className="card">
        <div className="section-board">
          <h2>게시판</h2>
        </div>
        <div className="section-board">
          <ul className="post-list">
            {posts.length === 0 && <p>등록된 데이터가 없습니다.</p>}
            {posts.length > 0 &&
              posts.map((post, index) => {
                if ((currentPage - 1) * limit <= index && (currentPage) * limit > index) {
                  return <PostItem key={post.__id} post={post} />;
                }
              })}
          </ul>
        </div>
        <div className="section-board">
          <ul className="page-number-list">
            {posts.length === 0 && <li>1</li>}
            {posts.length > 0 &&
              posts.map((post, index) => {
                if (index % limit === 0) {
                  const offset = index / limit + 1;

                  return (
                    <li
                      className={
                        offset === currentPage ? "current-page-number" : ""
                      }
                      key={post.__id}
                      onClick={() => setCurrentPage(offset)}
                    >
                      {offset}
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Main;
