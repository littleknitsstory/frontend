import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Menu from "./components/Menu";
import Blog from "./components/Blog";
import MainPage from "./components/MainPage";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Product from "./components/Product";
import Post from "./components/Post";
import Category from "./components/Category";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Menu />
              <MainPage />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <Menu />
              <Blog />
            </>
          }
        />
        <Route
          path="posts/:slug"
          element={
            <>
              <Menu />
              <Post />
            </>
          }
        />
        <Route
          path="categories/:slug"
          element={
            <>
              <Menu />
              <Category />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
              <Menu />
              <Categories />
              <Products />
            </>
          }
        />
        <Route
          path="/products/:slug"
          element={
            <>
              <Product />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
