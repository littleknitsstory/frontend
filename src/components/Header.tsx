import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/services/constants";

import logoMobile from "@/assets/images/logo-mobile.svg";
import logoDesktop from "@/assets/images/logo-desktop.svg";
import hamburger from "@/assets/icons/header-nav/hamburger.svg";
import cross from "@/assets/icons/header-nav/cross.svg";
import user from "@/assets/icons/header-nav/user.svg";
import courses from "@/assets/icons/header-nav/courses.svg";
import articles from "@/assets/icons/header-nav/articles.svg";
import orders from "@/assets/icons/header-nav/orders.svg";
import bookmarks from "@/assets/icons/header-nav/bookmarks.svg";

interface Dictionary {
  title: string;
  nav: {
    account: string;
    cart: string;
    favorites: string;
    courses: string;
    articles: string;
    orders: string;
    bookmarks: string;
    logout: string;
  };
}

export default function Header({ dictionary }: { dictionary: Dictionary }) {
  return (
    <header>
      <nav className="navbar header-navbar d-flex flex-md-column">
        <Link className="navbar-brand" href={ROUTES.HOME}>
          <Image
            src={logoMobile}
            alt="Little Knit Story Logo"
            width={250}
            height={30}
            priority
            className="d-sm-block d-md-none"
          />
          <Image
            src={logoDesktop}
            alt="Little Knit Story Logo"
            className="d-none d-md-inline"
            width={416}
            height={112}
          />
        </Link>

        <h1 className="d-none d-md-inline mt-2 text--md mx-auto">
          {dictionary.title}
        </h1>
        <button
          className="navbar-toggler header-toggler collapsed d-md-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarProfile"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="opened">
            <Image src={cross} alt="Hamburger Icon" />
          </span>
          <span className="collapsed">
            <Image src={hamburger} alt="Cross Icon" />
          </span>
        </button>
        <div
          className="collapse navbar-collapse mt-3 d-md-none "
          id="navbarProfile"
        >
          <ul className="navbar-nav gap-1">
            <li className="nav-item">
              <Link
                href={ROUTES.PROFILE}
                className="nav-link d-inline-flex py-2 align-items-center gap-2"
                data-bs-target="navbarProfile"
              >
                <Image src={user} alt="User icon" />
                <span className="text nav-item">{dictionary.nav.account}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href={ROUTES.PROFILE_COURSES}
                className="nav-link d-inline-flex py-2 align-items-center gap-2"
                data-bs-target="navbarProfile"
              >
                <Image src={courses} alt="Courses icon" />
                <span className="text nav-item">{dictionary.nav.courses}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href={ROUTES.ARTICLES}
                className="nav-link d-inline-flex py-2 align-items-center gap-2"
                data-bs-target="navbarProfile"
              >
                <Image src={articles} alt="Articles icon" />
                <span className="text nav-item">{dictionary.nav.articles}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href={ROUTES.PROFILE_ORDERS}
                className="nav-link d-inline-flex py-2 align-items-center gap-2"
                data-bs-target="navbarProfile"
              >
                <Image src={orders} alt="Orders icon" />
                <span className="text nav-item">{dictionary.nav.orders}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href={ROUTES.BOOKMARKS}
                className="nav-link d-inline-flex py-2 align-items-center gap-2"
                data-bs-target="navbarProfile"
              >
                <Image src={bookmarks} alt="Orders icon" />
                <span className="text nav-item">
                  {dictionary.nav.bookmarks}
                </span>
              </Link>
            </li>
            <hr />
          </ul>
        </div>
      </nav>
    </header>
  );
}
