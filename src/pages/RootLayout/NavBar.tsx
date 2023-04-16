import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetFeaturesQuery } from "../../components/features/api/apiSlice";
import Menu from "../../components/menu/Menu";
import { ReactComponent as ProfileIcon } from "../../assets/icons/user.svg";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart-big.svg";
import { ReactComponent as BagIcon } from "../../assets/icons/bag.svg";
import { ReactComponent as BookmarksIcon } from "../../assets/icons/bookmark-link.svg";
import { useEffect, useState } from "react";
import { ROUTES } from "../../app/routes";

const NavBar = () => {
  const { data: feature } = useGetFeaturesQuery();
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "English");

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

  return (
    <Navbar className="navbar">
      {/* <NavLink to={ROUTES.PROFILE} className="">
        {({ isActive, isPending }) => <ProfileIcon className={isActive ? "active" : ""} id="" />}
      </NavLink> */}
      <nav className="navbar__aside">
        <div className="navbar__divider"></div>
        {feature?.account && (
          <NavLink to={ROUTES.PROFILE} className="profile-icon">
            {({ isActive, isPending }) => (
              <ProfileIcon className={isActive ? "active" : ""} id="" />
            )}
          </NavLink>
        )}

        <NavLink to={ROUTES.BOOKMARKS} className="profile-icon">
          <BookmarksIcon id="profile-icon-svg" />
        </NavLink>
        <div className="navbar__divider"></div>
        <NavLink to={ROUTES.FAVORITE_PRODUCTS} className="profile-icon">
          <HeartIcon id="favorite-icon-svg" />
        </NavLink>
        <NavLink to={ROUTES.CART} className="profile-icon">
          <BagIcon id="bag-icon-svg" />
        </NavLink>
        <div className="navbar__divider"></div>
        <p className="navbar__change-lang" onClick={changeLang}>
          {lang}
        </p>
      </nav>

      <Menu type={"header"} className="navbar__main-link" />
    </Navbar>
  );
};

export default NavBar;
