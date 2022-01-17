import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostItem from "./PostItem";
import Card from "../../components/Card";
import "./Main.css";

const limit = 3;

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/post")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <Card>
      <div className="section-board">
        <h2>게시판</h2>
        <button onClick={() => navigate("post/add")}>글쓰기</button>
      </div>
      <div className="section-board">
        <ul className="post-list">
          {posts.length === 0 && <p>등록된 데이터가 없습니다.</p>}
          {posts.length > 0 &&
            posts.map((post, index) => {
              if (
                (currentPage - 1) * limit <= index &&
                currentPage * limit > index
              ) {
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
    </Card>
  );
};

export default Main;
