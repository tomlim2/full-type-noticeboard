import React from "react";
import './Card.scss'

const Card = ({ pageName, children }) => {
  const className = `${pageName} CardPage`
  return (
    <div className={className}>
      <div className="card">{children}</div>
    </div>
  );
};

export default Card;
