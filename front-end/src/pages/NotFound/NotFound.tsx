import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css"
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <div className="card">
        <div>
          <h1>404 - Not Found!</h1>
        </div>
        <div>
          <span className="linkTo" onClick={() => navigate("/")}>목록으로 돌아가기</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
