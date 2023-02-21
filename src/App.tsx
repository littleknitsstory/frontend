import "./sass/style.scss";

import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Article from "./components/Article";
import Cart from "./components/Cart";
import Page404 from "./components/Page404";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Product from "./components/Product";
import Products from "./components/Products";
import SavedProducts from "./components/SavedProducts";
<<<<<<< HEAD
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
=======
import ScrollToTop from "./components/ScrollToTop";
import ContactPage from "./routes/ContactPage";
import Home from "./routes/Home";
>>>>>>> 293eb9aa71f01e44ae5e3b052fa3ed1bac87e15f

// routes
import Root from "./routes/Root";
import Blog from "./routes/Blog";

export interface ILangContext {
  language: string;
  selectLanguage: (arg: string) => void;
}
<<<<<<< HEAD
export const LanguageContext = createContext<ILangContext>({ language: "en" });
=======
export const LanguageContext = createContext<ILangContext>({
  language: "en",
  selectLanguage: () => {},
});
>>>>>>> 293eb9aa71f01e44ae5e3b052fa3ed1bac87e15f

function App() {
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("i18nextLng") || "en"
  );
  const { i18n } = useTranslation();

  const selectLanguage = (lang: string): void => {
    setLanguage(lang);
    i18n.changeLanguage(lang.toLowerCase());
  };

  return (
    <LanguageContext.Provider value={{ language, selectLanguage }}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Navigate to="blog" />} />
            <Route path="blog" index element={<Blog />} />
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
