import React, { useState } from "react";
import Post from "../../models/posts";
import "./Pagination.scss";

const Pagination: React.FC<{
  posts: Post[];
  limit: number;
  currentPage: number;
  onSetCurrentPage: any;
  onSetLimit: any;
}> = ({ limit, posts, currentPage, onSetCurrentPage, onSetLimit }) => {
  const lastPageNumber = Math.floor(posts.length / limit + 1);
  const pageLimit = 2;
  const limitBiggerThanOffset = pageLimit + 1 < lastPageNumber;

  const handleLimitChange = (event) => {
    const newLastPageNumber = Math.floor(posts.length / event.target.value + 1);
    onSetLimit(Number(event.target.value));

    if (currentPage === lastPageNumber && limit < event.target.value) {
      onSetCurrentPage(newLastPageNumber);
    }
  };

  const movePage = (direction) => {
    onSetCurrentPage((prevPage) => {
      const newPageNumber = prevPage + direction;
      if (newPageNumber < 1) {
        return prevPage;
      }
      if (newPageNumber > lastPageNumber) {
        return prevPage;
      }
      return newPageNumber;
    });
  };

  return (
    <div className="Pagination">
      <select
        className="pageLimitSelecter"
        value={limit}
        onChange={handleLimitChange}
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>

      <div className="pageNumber">
        <span onClick={() => movePage(-1)} className="pageNumberArrow">
          {"<"}
        </span>
        <ul className="pageNumberList">
          {currentPage > pageLimit && limitBiggerThanOffset ? (
            <li>...</li>
          ) : null}
          {posts.length === 0 && <li>1</li>}
          {posts.length > 0 &&
            posts.map((post, index) => {
              const offset = index / limit + 1;

              const firstPage =
                currentPage === 1
                  ? offset < currentPage + pageLimit + 1
                  : offset < currentPage + pageLimit;

              const lastPage =
                currentPage === lastPageNumber
                  ? offset > currentPage - pageLimit - 1
                  : offset > currentPage - pageLimit;

              const isPageLimit = firstPage && lastPage;

              if (index % limit === 0 && isPageLimit) {
                offset < currentPage;
                return (
                  <li
                    className={
                      offset === currentPage ? "currentPageNumber" : ""
                    }
                    key={post.__id}
                    onClick={() => onSetCurrentPage(offset)}
                  >
                    {offset}
                  </li>
                );
              }
            })}
          {currentPage <= lastPageNumber - 2 && limitBiggerThanOffset ? <li>...</li> : null}
        </ul>
        <span onClick={() => movePage(1)} className="pageNumberArrow">
          {">"}
        </span>
      </div>
    </div>
  );
};

export default Pagination;
