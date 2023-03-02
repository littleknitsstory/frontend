import "./sass/style.scss";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Article from "./pages/Blog/Article";
import Cart from "./pages/Cart";
import PageError from "./pages/PageError";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Product from "./pages/Shop/Product";
import Products from "./pages/Shop/Products";
import SavedProducts from "./pages/SavedProducts";
import ScrollToTop from "./components/ScrollToTop";

// routes
import Root from "./pages/RootLayout";
import Blog from "./pages/Blog/Blog";
import ContactPage from "./pages/ContactPage";
// import Home from "./routes/Home"; /* Temporary unused route */

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Root />}>
          <Route path="/" element={<Blog />} />
          <Route path="blog" element={<Blog />} />
          <Route path="posts/:slug" element={<Article />} />
          <Route path="shop" element={<Products />} />
          <Route path="product/:slug" element={<Product />} />
          <Route path="contacts" element={<ContactPage />} />
          <Route path="saved" element={<SavedProducts />} />
          <Route path="cart" element={<Cart />} />
          <Route path="privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="*" element={<PageError errorStatus={404}/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
