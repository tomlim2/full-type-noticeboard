import React,{useEffect} from "react";
import PostItem from "./PostItem";

import "./Main.css";

const Main = () => {
    useEffect(() => {
        fetch()

    }, [])
    
  return (
    <div className="main">
      <div className="board">
        <div className="section">
          <h2>게시판</h2>
        </div>
        <div className="section">
          <ul className="post-list">
            <PostItem />
            <PostItem />
            <PostItem />
          </ul>
        </div>
        <div className="section">
          <ul className="pagination">
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Main;
