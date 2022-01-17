import React from "react";
import './Card.css'

const Card = ({ children }) => {
  return (
    <div className="card-wrapper">
      <div className="card">{children}</div>
    </div>
  );
};

export default Card;
