import React from "react";
import Link from "gatsby-link";

const Menu = () => (
  <div
    style={{
      background: "#f4f4f4",
      paddingTop: "10px",
    }}
  >
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/AboutPage">About</Link>
      </li>
      <li>
        <Link to="/Services">Services</Link>
      </li>
      <li>
        <Link to="/Blog">Blog</Link>
      </li>
    </ul>
  </div>
);

export default Menu;
