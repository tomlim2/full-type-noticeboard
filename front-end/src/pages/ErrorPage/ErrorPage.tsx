import React from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import "./ErrorPage.scss";

const ErrorPage: React.FC<{ status: number }> = ({ status }) => {
  return (
    <Card pageName="ErrorPage">
      <div>
        <h1>{status}</h1>
      </div>
      <div>
        <Button options={{ linkTo: "/" }}>목록으로 돌아가기</Button>
      </div>
    </Card>
  );
};

export default ErrorPage;
