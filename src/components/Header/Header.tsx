import Image from "next/image";
import Link from "next/link";
// import components

// import assets
import logoMobile from "../../../public/images/logo-mobile.svg";
import logo from "../../../public/images/logo.svg";
import hamburger from "../../../public/icons/hamburger.svg";
import cross from "../../../public/icons/cross.svg";
import user from "../../../public/icons/user.svg";

import styles from "./header.module.scss";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Header = () => {
  const { t } = useTranslation("header");

  return (
    <header>
      <nav className="navbar flex-md-column">
        <Link href="/" className="navbar-brand">
          <Image
            src={logoMobile}
            alt="Little Knits Story Logo"
            priority
            className="d-sm-block d-md-none"
          />
          <Image src={logo} alt="Little Knit Story Logo" className="d-none d-md-block" priority />
        </Link>
        <h1 className="d-none d-md-inline mt-3 text--lg">{t("title")}</h1>
        <button
          className="navbar-toggler collapsed d-sm-block d-md-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarProfile"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="opened">
            <Image src={cross} alt="Cross Icon" />
          </span>
          <span className="collapsed">
            <Image src={hamburger} alt="Hamburger Icon" />
          </span>
        </button>
        <div className="collapse navbar-collapse mt-3 d-md-none" id="navbarProfile">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" className={`${styles.navLink} nav-link`}>
                <span
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarProfile"
                  className="d-inline-flex align-items-center justify-content-start gap-2"
                >
                  <Image src={user} alt="Profile Icon" className={styles.navIcon}></Image>
                  Home
                </span>
              </Link>
            </li>
            <li className="nav-item" data-bs-toggle="collapse" data-bs-target="#navbarProfile">
              <Link
                href="/about"
                className="nav-link header__nav-link d-flex align-items-center gap-2"
              >
                <span data-bs-toggle="collapse" data-bs-target="#navbarProfile">
                  About
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
