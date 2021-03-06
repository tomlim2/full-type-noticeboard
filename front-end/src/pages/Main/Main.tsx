import React, { useEffect, useState } from "react";
import PostList from "./PostList";
import Pagination from "./Pagination";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./Main.scss";

const Main = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [enteredWords, setEnteredWords] = useState("");
  const [sortPosts, setSortPosts] = useState("recent");
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    getPosts();
  }, []);

  const resetPosts = () => {
    setCurrentPage(1);
    setLimit(5);
    setSortPosts("recent");
    setEnteredWords("");
    getPosts();
  };

  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/post");
      const data = await res.json();
      const sortedByRecent = sortByRecent(data);
      setPosts(data);
      setFilteredPosts(sortedByRecent);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const sortByRecent = (data) => {
    return sortPosts === "recent"
      ? data.sort((a, b) => {
          return b.postNumber - a.postNumber;
        })
      : data.sort((a, b) => {
          return b.postNumber - a.postNumber;
        });
  };

  const searchByAuthorName = async (authorName) => {
    const sortedByRecent = sortByRecent(posts);
    const filteredData = sortedByRecent.filter((post) =>
      post.author.includes(authorName)
    );

    setFilteredPosts(filteredData);
  };

  const searchPosts = (event) => {
    event.preventDefault();

    const sortedByRecent = sortByRecent(posts);
    const filteredData = sortedByRecent.filter(
      (post) =>
        post.title.toLowerCase().includes(enteredWords) ||
        post.content.toLowerCase().includes(enteredWords) ||
        post.author.toLowerCase().includes(enteredWords)
    );
    setFilteredPosts(filteredData);
  };

  const sortPostByOption = (event) => {
    setSortPosts(event.target.value);

    if (event.target.value === "recent") {
      setFilteredPosts((prevState) =>
        prevState.sort((a, b) => {
          return b.postNumber - a.postNumber;
        })
      );
    }

    if (event.target.value === "older") {
      setFilteredPosts((prevState) =>
        prevState.sort((b, a) => {
          return b.postNumber - a.postNumber;
        })
      );
    }
  };

  return (
    <Card pageName="Main">
      <div className="section header">
        <div className="headerInner">
          <h2>?????????</h2>
          <div className="buttonGroup">
            <Button options={{ onClick: resetPosts }}>?????????</Button>
            <div className="searchBar">
              <form onSubmit={searchPosts} className="searchForm">
                <input
                  className="searchInput"
                  value={enteredWords}
                  onChange={(event) => setEnteredWords(event.target.value)}
                  type="text"
                />
                <Button options={{ type: "submit" }}>??????</Button>
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
        {loading && <p>?????? ???????????? ????????????.</p>}
        {error && <p>????????? ???????????? ?????? ??? ??? ????????????</p>}
        {filteredPosts.length === 0 && !error && !loading && (
          <p>????????? ?????? ????????????</p>
        )}
        <PostList
          currentPage={currentPage}
          limit={limit}
          posts={filteredPosts}
          onSearchByAuthorName={searchByAuthorName}
        ></PostList>
      </div>
      <div className="section footer">
        <div className="footerInner">
          <Button options={{ linkTo: "post/add" }}>?????????</Button>
          <Pagination
            limit={limit}
            posts={filteredPosts}
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
