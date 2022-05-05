import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ childrens }) {
  return (
    <>
      <Navbar />
      {childrens}
      <Footer />
    </>
  );
}

export default Layout;
