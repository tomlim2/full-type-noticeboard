import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Pagination from "./Pagination";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./Main.scss";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [enteredWords, setEnteredWords] = useState("");
  const [sortPosts, setSortPosts] = useState("recent");
  const [limit, setLimit] = useState(5);
  const lastPageNumber = Math.floor(posts.length / limit + 1);

  useEffect(() => {
    fetch("http://localhost:5000/api/post")
      .then((res) => res.json())
      .then((data) => {
        const sortByRecent = sortPosts === "recent" ? data.reverse() : data;

        setPosts(sortByRecent);
      });
  }, []);

  const searchByAuthorName = (authorName) => {
    fetch("http://localhost:5000/api/post")
      .then((res) => res.json())
      .then((data) => {
        const sortByRecent = sortPosts === "recent" ? data.reverse() : data;

        const filteredData = sortByRecent.filter((post) =>
          post.author.includes(authorName)
        );

        setPosts(filteredData);
      });
  };

  const resetPosts = () => {
    fetch("http://localhost:5000/api/post")
      .then((res) => res.json())
      .then((data) => {
        const sortByRecent = sortPosts === "recent" ? data.reverse() : data;

        setPosts(sortByRecent);
      });
  };

  const searchPosts = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/api/post")
      .then((res) => res.json())
      .then((data) => {
        const sortByRecent = sortPosts === "recent" ? data.reverse() : data;
        const filteredData = sortByRecent.filter(
          (post) =>
            post.title.toLowerCase().includes(enteredWords) ||
            post.content.toLowerCase().includes(enteredWords) ||
            post.author.toLowerCase().includes(enteredWords)
        );
        setPosts(filteredData);
      });

    setEnteredWords("");
  };

  const sortPostByOption = (event) => {
    setSortPosts(event.target.value);

    if (event.target.value === "recent") {
      setPosts(
        posts.sort(function (a, b) {
          return b.postNumber - a.postNumber;
        })
      );
    }
    if (event.target.value === "older") {
      setPosts(
        posts.sort(function (b, a) {
          return b.postNumber - a.postNumber;
        })
      );
    }
  };

  

  return (
    <Card pageName="Main">
      <div className="section header">
        <div className="headerInner">
          <h2>게시판</h2>
          <div className="buttonGroup">
            <Button options={{ onClick: resetPosts }}>초기화</Button>
            <div className="searchBar">
              <form onSubmit={searchPosts} className="searchForm">
                <input
                  className="searchInput"
                  value={enteredWords}
                  onChange={(event) => setEnteredWords(event.target.value)}
                  type="text"
                />
                <Button options={{ type: "submit" }}>검색</Button>
              </form>
            </div>
            <select
              className="selectOption"
              value={sortPosts}
              onChange={sortPostByOption}
            >
              <option value="recent">Recent</option>
              <option value="older">Older</option>
            </select>
          </div>
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
                return (
                  <PostItem
                    key={post.__id}
                    post={post}
                    onClickAuthorName={searchByAuthorName}
                  />
                );
              }
            })}
        </ul>
      </div>
      <div className="section footer">
        <div className="footerInner">
          <Button options={{ linkTo: "post/add" }}>글쓰기</Button>
          <Pagination
            limit={limit}
            posts={posts}
            currentPage={currentPage}
            onSetLimit={setLimit}
            onSetCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </Card>
  );
};

export default Main;
