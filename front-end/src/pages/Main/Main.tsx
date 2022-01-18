import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./Main.scss";

const limit = 5;

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [enteredWords, setEnteredWords] = useState("");
  const [selectedOption, setSelectedOption] = useState("recent");

  useEffect(() => {
    fetch("http://localhost:5000/api/post")
      .then((res) => res.json())
      .then((data) => {
        const sortByRecent =
          selectedOption === "recent" ? data.reverse() : data;

        setPosts(sortByRecent);
      });
  }, []);

  const searchByAuthorName = (authorName) => {
    fetch("http://localhost:5000/api/post")
      .then((res) => res.json())
      .then((data) => {
        const sortByRecent =
          selectedOption === "recent" ? data.reverse() : data;

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
        const sortByRecent =
          selectedOption === "recent" ? data.reverse() : data;

        setPosts(sortByRecent);
      });
  };

  const searchPosts = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/api/post")
      .then((res) => res.json())
      .then((data) => {
        const sortByRecent =
          selectedOption === "recent" ? data.reverse() : data;
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

  const dropdownChangeHandler = (event) => {
    setSelectedOption(event.target.value);

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
        <div>
          <h2>게시판</h2>
          <div className="buttonGroup">
            <Button options={{ linkTo: "post/add" }}>글쓰기</Button>
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
              value={selectedOption}
              onChange={dropdownChangeHandler}
            >
              <option value="recent">Recent</option>
              <option value="older">Older</option>
            </select>
            <Button options={{ onClick: resetPosts }}>초기화</Button>
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
