import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Blog from "./components/Blog";
import AuthorCard from "./components/AuthorCard";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Product from "./components/Product";
import PostDetail from "./components/PostDetail";
import Category from "./components/Category";
import MainSlider from "./components/MainSlider";
import Instagram from "./components/Instagram";
import Footer from "./components/Footer";

function App() {
  //временно, для теста
  const [isSaved, setIsSaved] = useState(true);
  const [hasProducts, setHasProducts] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Menu isSaved={isSaved} hasProducts={hasProducts} />
              <MainSlider />
              <AuthorCard />
              <Instagram />
              <Footer />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <Header />
              <Menu isSaved={isSaved} hasProducts={hasProducts} />
              <Blog />
              <Footer />
            </>
          }
        />
        <Route
          path="posts/:slug"
          element={
            <>
              <Header />
              <Menu isSaved={isSaved} hasProducts={hasProducts} />
              <PostDetail />
            </>
          }
        />
        <Route
          path="categories/:slug"
          element={
            <>
              <Header />
              <Menu isSaved={isSaved} hasProducts={hasProducts} />
              <Category />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
              <Header />
              <Menu isSaved={isSaved} hasProducts={hasProducts} />
              <Categories />
              <Products />
            </>
          }
        />
        <Route
          path="/products/:slug"
          element={
            <>
              <Header />
              <Menu isSaved={isSaved} hasProducts={hasProducts} />
              <Product />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
