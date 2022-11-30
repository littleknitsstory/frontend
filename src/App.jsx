import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Blog from "./components/Blog";

import Categories from "./components/Categories";
import Products from "./components/Products";
import Product from "./components/Product";
import Post from "./components/Post";
import Category from "./components/Category";
import MainSlider from "./components/MainSlider";

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
            </>
          }
        />
        <Route
          path="posts/:slug"
          element={
            <>
              <Header />
              <Menu isSaved={isSaved} hasProducts={hasProducts} />
              <Post />
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
