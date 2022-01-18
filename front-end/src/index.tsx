import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import Router from "./Router";
import "./index.scss";

ReactDOM.render(
  <RecoilRoot>
    <Router />
  </RecoilRoot>,
  document.getElementById("root")
);
