import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetFeaturesQuery, useLogoutMutation } from "../../components/features/api/apiSlice";
import Menu from "../../components/menu/Menu";
import { ReactComponent as ProfileIcon } from "../../assets/icons/user.svg";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart-big.svg";
import { ReactComponent as BagIcon } from "../../assets/icons/bag.svg";
import { ReactComponent as BookmarksIcon } from "../../assets/icons/bookmark-link.svg";
import { useEffect, useState } from "react";
import { ROUTES } from "../../app/routes";

import { ReactComponent as ProfileHeaderIcon } from "../../assets/icons/user.svg";
import { ReactComponent as CoursesIcon } from "../../assets/icons/courses.svg";
import { ReactComponent as PostsIcon } from "../../assets/icons/posts.svg";
import { ReactComponent as OrdersIcon } from "../../assets/icons/orders.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { ITokens } from "../User/Profile";

const NavBar = () => {
  const { data: feature } = useGetFeaturesQuery();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "English");
  const tokens: ITokens = localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens") || "")
    : { tokens: { access: "", refresh: "" } };
  const navigate = useNavigate();

  const [logoutRequest] = useLogoutMutation();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(localStorage.getItem("i18nextLng") || "en");
    }
  }, [i18n, lang]);

  const changeLang = (e: React.MouseEvent) => {
    if (e.currentTarget.textContent === "English") {
      setLang("Русский");
      i18n.changeLanguage("ru");
      localStorage.setItem("lang", "Русский");
    } else {
      setLang("English");
      i18n.changeLanguage("en");
      localStorage.setItem("lang", "English");
    }
  };

  const profilePopover = (
    <Popover className="navbar-popover px-4 py-2 w-50">
      <Popover.Body>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to={ROUTES.PROFILE}
              className="nav-link header__nav-link d-flex align-items-center gap-2"
            >
              <ProfileHeaderIcon className="header-navbar--icon" />
              <span className="text">{t("Header.nav.account")}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={ROUTES.PROFILE_COURSES}
              className="nav-link header__nav-link d-flex align-items-center gap-2"
            >
              <CoursesIcon className="header-navbar--icon" />
              <span className="text">{t("Header.nav.courses")}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={ROUTES.PROFILE_ARTICLES}
              className="nav-link header__nav-link d-flex align-items-center gap-2"
            >
              <PostsIcon className="header-navbar--icon" />
              <span className="text">{t("Header.nav.posts")}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={ROUTES.PROFILE_ORDERS}
              className="nav-link header__nav-link d-flex align-items-center gap-2"
            >
              <OrdersIcon className="header-navbar--icon" />
              <span className="text">{t("Header.nav.orders")}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={ROUTES.BOOKMARKS}
              className="nav-link header__nav-link d-flex align-items-center gap-2"
            >
              <BookmarksIcon className="header-navbar--icon" />
              <span className="text">{t("Header.nav.bookmarks")}</span>
            </Link>
          </li>
          <div className="header-navbar--divider my-3"></div>
          <li className="nav-item">
            <button
              className="header-logout nav-link header__nav-link d-flex align-items-center gap-2"
              onClick={logout}
            >
              <LogoutIcon className="header-navbar--icon" />
              <span className="text">{t("Header.nav.logout")}</span>
            </button>
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  function logout(): void {
    localStorage.removeItem("tokens");
    logoutRequest(tokens);
    navigate("/login/");
  }

  return (
    <div className="container-lg">
      <nav className="navbar">
        <ul className="navbar-nav flex-row text text--md w-100 justify-content-evenly justify-content-md-start mt-3 gap-4">
          <Menu type={"header"} />
          <div className="d-flex ms-auto gap-3 d-none d-md-flex">
            <div className="vr"></div>
            {feature?.account && (
              <OverlayTrigger trigger="click" placement="bottom" overlay={profilePopover}>
                <div className="align-self-center">
                  <ProfileIcon />
                </div>
                {/* <NavLink to={ROUTES.PROFILE} className="navbar__icon align-self-center">
                  {({ isActive, isPending }) => (
                    <ProfileIcon className={isActive ? "active" : ""} id="" />
                  )}
                </NavLink> */}
              </OverlayTrigger>
            )}

            <div className="vr"></div>
            <NavLink to={ROUTES.FAVORITE_PRODUCTS} className="navbar__icon align-self-center">
              <HeartIcon id="favorite-icon-svg" className="align-self-center" />
            </NavLink>
            <NavLink to={ROUTES.CART} className="navbar__icon align-self-center">
              <BagIcon id="bag-icon-svg" />
            </NavLink>
            <div className="vr"></div>
            <p
              className="navbar__change-lang navbar__icon align-self-center m-0"
              onClick={changeLang}
            >
              {lang}
            </p>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
