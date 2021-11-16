import React from "react";

import Header from "../components/Header";
import Menu from "../components/Menu";
import "./index.css";

const IndexPage = () => (
  <div>
    <Header />
    <Menu />
    <h1>Welcome to my website</h1>
    <p>This is a sample site for the Gatsby crash course</p>
  </div>
);

export default IndexPage;
