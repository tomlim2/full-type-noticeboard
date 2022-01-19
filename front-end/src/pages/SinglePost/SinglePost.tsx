import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../../models/posts";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./SinglePost.scss";

const SinglePost = () => {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  useEffect(() => {
    getSinglePost(path);
  }, []);

  const getSinglePost = async (pathParams: string) => {
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/post/${pathParams}`);
      const data = await res.json();
      setPost(data);
    } catch (error) {
      setError(true);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/post/${path}`, {
        method: "DELETE",
      });
      if (res) {
        alert("해당 글이 삭제되었습니다!");
        navigate("/");
      }
    } catch (error) {
      alert("삭제 요청이 실패하였습니다. 잠시 후에 다시 시도해 주세요!");
    }
  };

  const formatDate = (date: string) => {
    const getDate = new Date(date);
    return (
      getDate.getFullYear() +
      " / " +
      (getDate.getMonth() + 1) +
      " / " +
      getDate.getDate()
    );
  };

  return (
    <Card pageName="SinglePost">
      <div className="section header">
        <div>
          제목
          <h1>{post && post.title}</h1>
          {loading && <div>"글을 불러오는 중입니다"</div>}
          {error && <div>"글을 불러올 수 없습니다"</div>}
        </div>
      </div>
      <div className="section body">
        <div className="infos">
          <div className="info">
            글번호
            <span className="item">{post && post.postNumber}</span>
          </div>
          <div className="info author">
            작성자
            <span className="item">{post && post.author}</span>
          </div>
          <div className="info">
            작성일
            <span className="item">{post && formatDate(post.editedAt)}</span>
          </div>
        </div>
        <div className="content">
          내용 <br />
          <p>{post && post.content}</p>
        </div>
      </div>
      <div className="section">
        <Button options={{ linkTo: `/post/update/${path}` }}>
          이 글 수정하기
        </Button>
        <Button options={{ onClick: deletePost }}>삭제하기</Button>
        <Button options={{ linkTo: "/" }}>목록으로</Button>
      </div>
    </Card>
  );
};

export default SinglePost;
