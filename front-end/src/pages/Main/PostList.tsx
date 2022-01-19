import React from "react";
import PostItem from "./PostItem";
import Post from "../../models/posts";
import "./PostList.scss"

const PostList: React.FC<{
  posts: Post[];
  currentPage: number;
  limit: number;
  onSearchByAuthorName: any;
}> = ({ posts, currentPage, limit, onSearchByAuthorName }) => {
  return (
    <ul className="PostList">
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
                onClickAuthorName={onSearchByAuthorName}
              />
            );
          }
        })}
    </ul>
  );
};

export default PostList;
