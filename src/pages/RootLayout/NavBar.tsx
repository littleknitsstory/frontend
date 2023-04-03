import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PrimaryNav from "../../components/primary-nav/PrimaryNav";
import { ReactComponent as ProfileIcon } from "../../assets/icons/user.svg";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart-big.svg";
import { ReactComponent as BagIcon } from "../../assets/icons/bag.svg";
import { ReactComponent as BookmarksIcon } from "../../assets/icons/bookmark-link.svg";
import { useEffect, useState } from "react";
import { ROUTES } from "../../app/routes";

const NavBar = () => {
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
    <Navbar expand="lg" className="navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <nav className="navbar__aside">
        <div className="navbar__divider"></div>
        <NavLink to="/profile" className="profile-icon">
          {({ isActive, isPending }) => (
            <span className={isActive ? "active" : ""}>
              <ProfileIcon id="profile-icon-svg" />
            </span>
          )}
        </NavLink>
        <NavLink to={ROUTES.BOOKMARKS} className="profile-icon">
          <BookmarksIcon id="profile-icon-svg" />
        </NavLink>
        <div className="navbar__divider"></div>
        {/* <a href="#">
          <img src={logout} alt="logout" />
        </a> */}
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

      <Navbar.Collapse className="navbar__main">
        <PrimaryNav type={"header"} className="navbar__main-link" />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
