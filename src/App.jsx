import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
              <Articles />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
