import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.scss";

const Button = ({ options, children }) => {
  const navigate = useNavigate();
  const buttonClassName = options.className
    ? `Button ${options.className}`
    : "Button";
  const buttonType = options.type ? options.type : "button";
  const clickHandler = () => {
    if (options.onClick) options.onClick();
    if (options.linkTo) navigate(options.linkTo);
  };

  return (
    <button
      onClick={clickHandler}
      className={buttonClassName}
      type={buttonType}
    >
      {children}
    </button>
  );
};

export default Button;
