import { RouteObject } from "react-router-dom";
import Cart from "../pages/Cart";
import PageError from "../pages/PageError";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Product from "../pages/Shop/Product";
import SavedProducts from "../pages/SavedProducts";
import Blog from "../pages/Blog";
import ContactPage from "../pages/Contacts";
import RootLayout from "../pages/RootLayout";
import Products from "../pages/Shop/Products";
import Article from "../pages/Blog/Article";
import Home from "../pages/Home";
import LoginPage from "../pages/User/LoginPage";
import Profile from "../components/user/Profile";
import AuthRequired from "../components/AuthRequired";
import { Navigate } from "react-router-dom";

const routes: RouteObject = {
  element: <RootLayout />,
  errorElement: <PageError errorStatus={404} />,
  children: [
    {
      path: "/",
      /* Temporary used Blog as homepage */
      element: <Navigate to="blog"/>,
    },
    {
      path: "blog",
      element: <Blog />,
    },
    {
      path: "posts/:slug",
      element: <Article />,
    },
    {
      path: "shop",
      element: <Products />,
    },
    {
      path: "product/:slug",
      element: <Product />,
    },
    {
      path: "contacts",
      element: <ContactPage />,
    },
    {
      path: "saved",
      element: <SavedProducts />,
    },
    {
      path: "cart",
      element: <Cart />,
    },
    {
      path: "privacyPolicy",
      element: <PrivacyPolicy />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      element: <AuthRequired />,
      children: [
        {
          path: "profile",
          element: <Profile />
        },
      ]
    }
  ],
};



export default routes;
