import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ options, children }) => {
  const navigate = useNavigate();
  const buttonClassName = options.className
    ? `Button ${options.className}`
    : "Button";
  const buttonType = options.type ? "button" : options.type;
  const navigateTo = () => {
    if (options.linkTo) navigate(options.linkTo);
  };

  return (
    <button onClick={navigateTo} className={buttonClassName} type={buttonType}>
      {children}
    </button>
  );
};

export default Button;
