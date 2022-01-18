import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./Main.scss";

const limit = 5;

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/api/post")
      .then((res) => res.json())
      .then((data) => setPosts(data.reverse()));
  }, []);

  return (
    <Card pageName="Main">
      <div className="section header">
        <div>
          <h2>게시판</h2>
          <Button options={{ linkTo: "post/add" }}>글쓰기</Button>
        </div>
      </div>
      <div className="section">
        <ul className="postList">
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
      <div className="section">
        <ul className="pageNumberList">
          {posts.length === 0 && <li>1</li>}
          {posts.length > 0 &&
            posts.map((post, index) => {
              if (index % limit === 0) {
                const offset = index / limit + 1;

                return (
                  <li
                    className={
                      offset === currentPage ? "currentPageNumber" : ""
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
