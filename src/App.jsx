import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Blog from "./components/Blog";
import MainPage from "./components/MainPage";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Product from "./components/Product";
import Post from "./components/Post";
import Category from "./components/Category";
import MainSlider from "./components/MainSlider";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Menu />
              {/* <MainPage /> */}
              <MainSlider />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <Header />
              <Menu />
              <Blog />
            </>
          }
        />
        <Route
          path="posts/:slug"
          element={
            <>
              <Header />
              <Menu />
              <Post />
            </>
          }
        />
        <Route
          path="categories/:slug"
          element={
            <>
              <Header />
              <Menu />
              <Category />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
              <Header />
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
              <Header />
              <Product />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
