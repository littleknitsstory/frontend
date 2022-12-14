import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";

import logo from "../assests/images/logo.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [languageRu, setLanguageRu] = useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setLanguageRu(!languageRu);
  };

  return (
    <section className="header">
      <Container>
        <div className="row">
          <div className="col-12">
            <Link to="/">
              <img src={logo} alt="logo" />
              <h1 className="header__title">Little Knits Story</h1>
            </Link>
          </div>
        </div>
        <div className="lang-switch">
          <button
            onClick={
              languageRu
                ? () => changeLanguage("en")
                : () => changeLanguage("ru")
            }
          >
            {languageRu ? "EN" : "RU"}
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Header;
