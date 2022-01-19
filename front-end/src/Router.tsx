import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import SinglePost from "./pages/SinglePost/SinglePost";
import AddPost from "./pages/AddPost/AddPost";
import UpdatePost from "./pages/UpdatePost/UpdatePost";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import UserInfo from "./components/UserInfo";

const Router = () => {
  return (
    <BrowserRouter>
      <UserInfo />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="post/add" element={<AddPost />} />
        <Route path="post/:id" element={<SinglePost />}></Route>
        <Route path="post/update/:id" element={<UpdatePost />} />
        <Route path="*" element={<ErrorPage status={404} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
