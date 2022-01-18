import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Card pageName="NotFound">
      <div>
        <h1>404 - Not Found!</h1>
      </div>
      <div>
        <button className="linkTo" onClick={() => navigate("/")}>
          목록으로 돌아가기
        </button>
      </div>
    </Card>
  );
};

export default NotFound;
