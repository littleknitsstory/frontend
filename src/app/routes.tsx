import { RouteObject } from "react-router-dom";
import Cart from "../pages/Cart";
import PageError from "../pages/PageError";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Product from "../pages/Shop/Product";
import SavedProducts from "../pages/SavedProducts";
import Blog from "../pages/Blog/Blog";
import ContactPage from "../pages/ContactPage";
import RootLayout from "../pages/RootLayout";
import Products from "../pages/Shop/Products";
import Article from "../pages/Blog/Article";
import Home from "../pages/Home";

const routes: RouteObject = 
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        /* Temporary used Blog as homepage */
        element: <Blog />,
        errorElement: <PageError errorStatus={404}/>
      },
      {
        path: "blog",
        element: <Blog />
      },
      {
        path: "posts/:slug",
        element: <Article />
      },
      {
        path: "shop",
        element: <Products />
      },
      {
        path: "product/:slug",
        element: <Product />
      },
      {
        path: "contacts",
        element: <ContactPage />
      },
      {
        path: "saved",
        element: <SavedProducts />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "privacyPolicy",
        element: <PrivacyPolicy />
      }
    ]
  }

  export default routes