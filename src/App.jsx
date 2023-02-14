import "./sass/style.scss";

import React, { createContext, useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AboutMe from "./components/AboutMe";
import Article from "./components/Article";
import Articles from "./components/Articles";
import Cart from "./components/Cart";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Instagram from "./components/Instagram";
import LastReviews from "./components/LastReviews";
import MainSlider from "./components/MainSlider";
import NavBar from "./components/NavBar";
import Page404 from "./components/Page404";
import Product from "./components/Product";
import Products from "./components/Products";
import Promo from "./components/Promo";
import SavedProducts from "./components/SavedProducts";
import SchemasCard from "./components/SchemasCard";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop"

import i18n from "./i18n";

export const LanguageContext = createContext()

function App() {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en")
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language.toLowerCase())
  }, [language])

  function selectLanguage(lang) {
    setLanguage(lang)
    localStorage.setItem("lang", lang)
  }
  return (
    <LanguageContext.Provider value={[language, selectLanguage]}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <NavBar />
                <Promo />
                <SchemasCard />
                <AboutMe />
                <LastReviews />
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
                <NavBar />
                <MainSlider />
                <Articles />
                <Footer />
              </>
            }
          />
          <Route
            path="/article"
            element={
              <>
                <Header />
                <NavBar />
                <Article />
                <Footer />
              </>
            }
          />
          <Route
            path="/product/:slug"
            element={
              <>
                <Header />
                <NavBar />
                <Product />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved"
            element={
              <>
                <Header />
                <NavBar />
                <SavedProducts />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Header />
                <NavBar />
                <Cart />
                <Footer />
              </>
            }
          />
          <Route
            path="/shop"
            element={
              <>
                <Header />
                <NavBar />
                <Products />
                <Footer />
              </>
            }
          />
          <Route
            path="/contacts"
            element={
              <>
                <Header />
                <NavBar />
                <Contacts />
                <Instagram />
                <Footer />
              </>
            }
          />
          <Route
            path="privacyPolicy"
            element={
              <>
                <Header />
                <NavBar />
                <PrivacyPolicy />
                <Footer />
              </>
            }
          />
          
          <Route
            path="*"
            element={
              <>
                <Header />
                <NavBar />
                <Page404 />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
