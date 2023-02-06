import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Promo from "./components/Promo";
import SchemasCard from "./components/SchemasCard";
import AboutMe from "./components/AboutMe";
import LastReviews from "./components/LastReviews";
import Instagram from "./components/Instagram";
import Footer from "./components/Footer";
import MainSlider from "./components/MainSlider";
import Articles from "./components/Articles";
import Page404 from "./components/Page404";
import Article from "./components/Article";
import Contacts from "./components/Contacts";
import Product from "./components/Product";
import Products from "./components/Products";
import SavedProducts from "./components/SavedProducts";
import Cart from "./components/Cart";
import { useTranslation } from "react-i18next";

import "./css/style.css";
export const Language = React.createContext()
export const BaseUrl = React.createContext()

function App() {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "RU")
  const { i18n } = useTranslation()
  const baseUrl = "http://dev.backend.littleknitsstory.com:26363/"

  const selectLanguage = e => {
    setLanguage(e.target.textContent)
    localStorage.setItem("lang", e.target.textContent)
  }

  useEffect(() => {
    i18n.changeLanguage(language.toLowerCase())
  }, [language])

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Language.Provider value={language}>
              <BaseUrl.Provider value={baseUrl}>
                <Header />
                <NavBar selectLanguage={selectLanguage}/>
                <Promo />
                <SchemasCard />
                <AboutMe />
                <LastReviews />
                <Instagram />
                <Footer />
              </BaseUrl.Provider>
              </Language.Provider>
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <Language.Provider value={language}>
                <Header />
                <NavBar selectLanguage={selectLanguage}/>
                <MainSlider />
                <Articles />
                <Footer />
              </Language.Provider>
            </>
          }
        />
        <Route
          path="/article/:id"
          element={
            <>
            <Language.Provider value={language}>
              <Header />
              <NavBar selectLanguage={selectLanguage}/>
              <Article />
              <Footer />
            </Language.Provider>
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
            <Language.Provider value={language}>
              <Header />
              <NavBar selectLanguage={selectLanguage}/>
              <Product />
              <Footer />
            </Language.Provider>
            </>
          }
        />
        <Route
          path="/saved"
          element={
            <>
            <Language.Provider value={language}>
              <Header />
              <NavBar selectLanguage={selectLanguage}/>
              <SavedProducts />
              <Footer />
            </Language.Provider>
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
            <Language.Provider value={language}>
              <Header />
              <NavBar selectLanguage={selectLanguage}/>
              <Cart />
              <Footer />
            </Language.Provider>
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
            <Language.Provider value={language}>
              <Header />
              <NavBar selectLanguage={selectLanguage}/>
              <Products />
              <Footer />
            </Language.Provider>
            </>
          }
        />
        <Route
          path="/contacts"
          element={
            <>
            <Language.Provider value={language}>
              <Header />
              <NavBar selectLanguage={selectLanguage}/>
              <Contacts />
              <Instagram />
              <Footer />
            </Language.Provider>
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
            <Language.Provider value={language}>
              <Header />
              <NavBar selectLanguage={selectLanguage}/>
              <Page404 />
              <Footer />
            </Language.Provider>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
