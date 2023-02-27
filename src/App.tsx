import "./sass/style.scss";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Article from "./components/Article";
import Cart from "./components/Cart";
import Page404 from "./components/Page404";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Product from "./components/Product";
import Products from "./components/Products";
import SavedProducts from "./components/SavedProducts";
import ScrollToTop from "./components/ScrollToTop";

// routes
import Root from "./routes/Root";
import Blog from "./routes/Blog";
import ContactPage from "./routes/ContactPage";
// import Home from "./routes/Home"; /* Temporary unused route */

function App() {
  return (
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
  );
}

export default App;
