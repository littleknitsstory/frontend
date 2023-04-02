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
import Home from "../pages/Home";

// import { URLS } from "../components/features/api/apiSlice";
export enum ROUTES {
  HOME = "/",
  ARTICLES = "/articles/",
  PRODUCTS = "/products/",
  CONTACTS = "/contacts/",
  CART = "/cart/",
  ORDERING = "/cart/ordering/",
  LOGIN = "/login/",
  PROFILE = "/profile/",
  FAVORITE_PRODUCTS = "/favorites/",
  PRIVACY_POLICY = "/privacyPolicy/",
}

const routes: RouteObject = {
  element: <RootLayout />,
  errorElement: <PageError errorStatus={404} />,
  children: [
    {
      path: "/",
      /* Temporary used Blog as homepage */
      element: <Navigate to={ROUTES.ARTICLES} />,
    },
    {
      path: ROUTES.ARTICLES,
      element: <Posts />,
    },
    {
      path: ROUTES.ARTICLES + ":slug",
      element: <Post />,
    },
    {
      path: ROUTES.PRODUCTS,
      element: <Products />,
    },
    {
      path: ROUTES.PRODUCTS + ":slug",
      element: <Product />,
    },
    {
      path: ROUTES.CONTACTS,
      element: <ContactPage />,
    },
    {
      path: ROUTES.FAVORITE_PRODUCTS,
      element: <SavedProducts />,
    },
    {
      path: ROUTES.CART,
      element: <Cart />,
    },
    {
      path: ROUTES.ORDERING,
      element: <Ordering />,
    },
    {
      path: ROUTES.PRIVACY_POLICY,
      element: <PrivacyPolicy />,
    },
    {
      path: ROUTES.LOGIN,
      element: <LoginPage />,
    },
    {
      element: <AuthRequired />,
      children: [
        {
          path: ROUTES.PROFILE,
          element: <Profile />,
        },
      ],
    },
  ],
};

export default routes;
