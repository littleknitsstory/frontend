import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoLKS from "../../assets/images/logo-lks.svg";
import { ROUTES } from "../../app/routes";
import logoMobile from "../../assets/images/logo-mobile.png";
import { ReactComponent as HamburgerIcon } from "../../assets/icons/hamburger.svg";
import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";
import { ReactComponent as ProfileHeaderIcon } from "../../assets/icons/user.svg";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart-big.svg";
import { ReactComponent as BagIcon } from "../../assets/icons/bag.svg";
import { ReactComponent as BookmarksIcon } from "../../assets/icons/bookmark-link.svg";
import { ReactComponent as CoursesIcon } from "../../assets/icons/courses.svg";
import { ReactComponent as PostsIcon } from "../../assets/icons/posts.svg";
import { ReactComponent as OrdersIcon } from "../../assets/icons/orders.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header>
      <nav className="navbar header-navbar">
        <div className="container-fluid justify-content-md-center flex-md-column">
          <a className="navbar-brand" href={ROUTES.HOME}>
            <img
              src={logoMobile}
              alt="Little Knit Story Logo"
              width="250px"
              className="d-sm-block d-md-none"
            />
            <img src={logoLKS} alt="Little Knit Story Logo" className="d-none d-md-inline" />
          </a>
          <h1 className="text text--md d-none d-md-inline mt-2">Блог и магазин по вязанию</h1>
          <button
            className="navbar-toggler header-toggler collapsed d-sm-block d-md-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarProfile"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="opened">
              <CrossIcon />
            </span>
            <span className="collapsed">
              <HamburgerIcon />
            </span>
          </button>
          <div className="collapse navbar-collapse mt-4 d-md-block d-md-none" id="navbarProfile">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={ROUTES.PROFILE} className="nav-link d-flex align-items-center gap-2">
                  <ProfileHeaderIcon className="header-navbar--icon" />
                  <span className="text text--md">Личный кабинет</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={ROUTES.CART} className="nav-link d-flex align-items-center gap-2">
                  <BagIcon className="header-navbar--icon" />
                  <span className="text text--md">Корзина</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={ROUTES.FAVORITE_PRODUCTS}
                  className="nav-link d-flex align-items-center gap-2"
                >
                  <HeartIcon className="header-navbar--icon" />
                  <span className="text text--md">Избранное</span>
                </Link>
              </li>
              <div className="header-navbar--divider my-3"></div>
              <li className="nav-item">
                <Link
                  to={ROUTES.PROFILE_COURSES}
                  className="nav-link d-flex align-items-center gap-2"
                >
                  <CoursesIcon className="header-navbar--icon" />
                  <span className="text text--md">Мои курсы</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={ROUTES.PROFILE_ARTICLES}
                  className="nav-link d-flex align-items-center gap-2"
                >
                  <PostsIcon className="header-navbar--icon" />
                  <span className="text text--md">Мои посты</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={ROUTES.PROFILE_ORDERS}
                  className="nav-link d-flex align-items-center gap-2"
                >
                  <OrdersIcon className="header-navbar--icon" />
                  <span className="text text--md">Мои заказы</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={ROUTES.BOOKMARKS} className="nav-link d-flex align-items-center gap-2">
                  <BookmarksIcon className="header-navbar--icon" />
                  <span className="text text--md">Список для чтения</span>
                </Link>
              </li>
              <div className="header-navbar--divider my-3"></div>

              {/* TODO Logout functionality */}
              <li className="nav-item">
                <Link to={ROUTES.PROFILE} className="nav-link d-flex align-items-center gap-2">
                  <LogoutIcon className="header-navbar--icon" />
                  <span className="text text--md">Выйти</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
