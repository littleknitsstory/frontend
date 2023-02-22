import "./sass/style.scss";

import { createContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Article from "./components/Article";
import Cart from "./components/Cart";
import Page404 from "./components/Page404";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Product from "./components/Product";
import Products from "./components/Products";
import SavedProducts from "./components/SavedProducts";
import ScrollToTop from "./components/ScrollToTop";
import Blog from "./routes/Blog";
import ContactPage from "./routes/ContactPage";
// routes
import Root from "./routes/Root";
import { store } from "./store";

export interface ILangContext {
  language: string;
  selectLanguage: (arg: string) => void;
}
export const LanguageContext = createContext<ILangContext>({
  language: "en",
  selectLanguage: () => {},
});

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
    <Provider store={store}>
      <LanguageContext.Provider value={{ language, selectLanguage }}>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Root />}>
              <Route path="/" element={<Blog />} />
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
    </Provider>
  );
}

export default App;
