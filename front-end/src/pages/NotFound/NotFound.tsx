import React from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <Card pageName="NotFound">
      <div>
        <h1>404 - Not Found!</h1>
      </div>
      <div>
        <Button options={{ linkTo: "/" }}>목록으로 돌아가기</Button>
      </div>
    </Card>
  );
};

export default NotFound;
