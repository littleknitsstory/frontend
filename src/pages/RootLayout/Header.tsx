import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactComponent as LogoLKS } from "../../assets/images/logo-lks.svg";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header>
      <Link to="/">
        <LogoLKS className="header__logo" />
        <h1 className="header__title">{t("Header.title")}</h1>
      </Link>
    </header>
  );
};

export default Header;
