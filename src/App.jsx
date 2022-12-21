import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Blog from "./components/Blog";
import LastPosts from "./components/LastPosts";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import PostDetail from "./components/PostDetail";
import Contacts from "./components/Contacts";
import MainSlider from "./components/MainSlider";
import Instagram from "./components/Instagram";
import Footer from "./components/Footer";
import Saved from "./components/Saved";
import Cart from "./components/Cart";
import Page404 from "./components/Page404";

import "./i18n";

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
              <MainSlider />
              <LastPosts />
              <Products
                limit={4}
                categoriesVisible="categories-visible-none"
                col={3}
              />
              <Instagram />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved"
          element={
            <>
              <Header />
              <Menu />
              <Saved />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Menu />
              <Cart />
              <Footer />
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
              <Footer />
            </>
          }
        />
        <Route
          path="posts/:slug"
          element={
            <>
              <Header />
              <Menu />
              <PostDetail />
              <Footer />
            </>
          }
        />

        <Route
          path="/shop"
          element={
            <>
              <Header />
              <Menu />
              <Products
                limit={6}
                categoriesVisible="col-lg-3 col-xl-3 col-md-12 col-xs-12"
                col={6}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/:slug"
          element={
            <>
              <Header />
              <Menu />
              <ProductDetail />
              <Products limit={4} categoriesVisible="categories-visible-none" />
              <Instagram />
              <Footer />
            </>
          }
        />
        <Route
          path="/contacts"
          element={
            <>
              <Header />
              <Menu />
              <Contacts />
              <Footer />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Header />
              <Menu />
              <Page404 />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
