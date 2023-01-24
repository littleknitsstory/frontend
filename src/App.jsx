import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Promo from "./components/Promo";
import SchemasCard from "./components/SchemasCard";
import AboutMe from "./components/AboutMe";
import LastReviews from "./components/LastReviews";
import Instagram from "./components/Instagram";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import Articles from "./components/Articles";
import Page404 from "./components/Page404";
import Article from "./components/Article";
import Contacts from "./components/Contacts";
import "./css/style.css";

function App() {
  return (
    <Router>
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
              <Slider />
              <Container>
                <Articles />
              </Container>
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
  );
}

export default App;
