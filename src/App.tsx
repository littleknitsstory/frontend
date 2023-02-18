import "./sass/style.scss";

import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Article from "./components/Article";
import Cart from "./components/Cart";
import Page404 from "./components/Page404";
import Product from "./components/Product";
import Products from "./components/Products";
import SavedProducts from "./components/SavedProducts";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop"

// routes
import Root from "./routes/Root";
// import Home from "./routes/Home";
import Blog from "./routes/Blog";
import ContactPage from "./routes/ContactPage";

export interface ILangContext {
  language: string;
  selectLanguage?: (arg: string) => void;
}
export const LanguageContext = createContext<ILangContext>({language: "en"})

function App() {
  const [ language, setLanguage ] = useState(localStorage.getItem("i18nextLng") || "en")
  const { i18n } = useTranslation()
  
  const selectLanguage = (lang: string)  => {
    setLanguage(lang)
    i18n.changeLanguage(lang.toLowerCase())
  }
  
  return (
    <LanguageContext.Provider value={{language, selectLanguage}}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Blog />} /> {/* Change homepage to "Blog" */}
            <Route path="blog" element={<Blog />} />
            <Route path="posts/:slug" element={<Article />} />
            <Route path="shop" element={<Products />} />
            <Route path="product/:slug" element={<Product />} />
            <Route path="contacts" element={<ContactPage />} />
            <Route path="saved" element={<SavedProducts />} />
            <Route path="cart" element={<Cart />} />
            <Route path="privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
