import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import SinglePost from "./pages/SinglePost/SinglePost";
import AddPost from "./pages/AddPost/AddPost";
import UpdatePost from "./pages/UpdatePost/UpdatePost";
import NotFound from "./pages/NotFound/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="post/:id" element={<SinglePost />}></Route>
        <Route path="post/add" element={<AddPost />} />
        <Route path="post/update" element={<UpdatePost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
