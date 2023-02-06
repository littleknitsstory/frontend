import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

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
import Products from "./components/Products";
import SavedProducts from "./components/SavedProducts";
import Cart from "./components/Cart";

import "./css/style.css";
import Product from "./components/Product";

function App() {

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header/>
                            <NavBar/>
                            <Promo/>
                            <SchemasCard/>
                            <AboutMe/>
                            <LastReviews/>
                            <Instagram/>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="/blog"
                    element={
                        <>
                            <Header/>
                            <NavBar/>
                            <MainSlider/>
                            <Articles/>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="/article"
                    element={
                        <>
                            <Header/>
                            <NavBar/>
                            <Article/>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="/product"
                    element={
                        <>
                            <Header/>
                            <NavBar/>
                            <Product/>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="/saved"
                    element={
                        <>
                            <Header/>
                            <NavBar/>
                            <SavedProducts/>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <>
                            <Header/>
                            <NavBar/>
                            <Cart/>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="/shop"
                    element={
                        <>
                            <Header/>
                            <NavBar/>
                            <Products/>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="/contacts"
                    element={
                        <>
                            <Header/>
                            <NavBar/>
                            <Contacts/>
                            <Instagram/>
                            <Footer/>
                        </>
                    }
                />
                <Route
                    path="*"
                    element={
                        <>
                            <Header/>
                            <NavBar/>
                            <Page404/>
                            <Footer/>
                        </>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
