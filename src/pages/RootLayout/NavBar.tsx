import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetFeaturesQuery } from "../../components/features/api/apiSlice";
import Menu from "../../components/menu/Menu";
import { ReactComponent as ProfileIcon } from "../../assets/icons/user.svg";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart-big.svg";
import { ReactComponent as BagIcon } from "../../assets/icons/bag.svg";
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
    <div className="container-lg">
      <nav className="navbar">
        <ul className="navbar-nav flex-row text text--md w-100 justify-content-evenly justify-content-md-start mt-3 gap-4">
          <Menu type={"header"} />
          <div className="d-flex ms-auto gap-3 d-none d-md-flex">
            <div className="vr"></div>
            {feature?.account && (
              <NavLink to={ROUTES.PROFILE} className="navbar__icon align-self-center">
                {({ isActive, isPending }) => (
                  <ProfileIcon className={isActive ? "active" : ""} id="" />
                )}
              </NavLink>
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
