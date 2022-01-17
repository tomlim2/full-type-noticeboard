import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import PostDetail from "./pages/PostDetail/PostDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="post" element={<PostDetail />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
