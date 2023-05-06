import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import CollapsedNavbar from "./CollapsedNavbar";

import logoMobile from "../../../public/images/logo-mobile.svg";
import logo from "../../../public/images/logo.svg";

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
        <h1 className="d-none d-md-inline mt-3 text--md text--dark-grey">{t("title")}</h1>
        <CollapsedNavbar />
      </nav>
    </header>
  );
};
export default Header;
