import React from "react";
import Footer from "./Footer";

export default function Layout({children}) {
  return (
    <React.Fragment>
      {children}
      <Footer />
    </React.Fragment>
  );
}
