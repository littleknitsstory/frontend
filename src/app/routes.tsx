import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Cart from "../pages/Cart/Cart";
import PageError from "../pages/PageError";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Product from "../pages/Shop/Product";
import SavedProducts from "../pages/SavedProducts";
import Posts from "../pages/Blog";
import ContactPage from "../pages/Contacts";
import RootLayout from "../pages/RootLayout";
import Products from "../pages/Shop/Products";
import Post from "../pages/Blog/Post";
import LoginPage from "../pages/User/LoginPage";
import Profile from "../components/user/Profile";
import AuthRequired from "../components/utils/AuthRequired";
import Ordering from "../pages/Cart/Ordering";

const routes: RouteObject = {
  element: <RootLayout />,
  errorElement: <PageError errorStatus={404} />,
  children: [
    {
      path: "/",
      /* Temporary used Blog as homepage */
      element: <Navigate to="/posts/" />,
    },
    {
      path: "posts",
      element: <Posts />,
    },
    {
      path: "posts/:slug",
      element: <Post />,
    },
    {
      path: "products",
      element: <Products />,
    },
    {
      path: "products/:slug",
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
      path: "cart/ordering",
      element: <Ordering />,
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
          element: <Profile />,
        },
      ],
    },
  ],
};

export default routes;
