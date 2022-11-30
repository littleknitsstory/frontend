import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="header">
      <div className="lks-container">
        <div className="header__label">Блог и магазин по вязанию</div>
        <Link to="/">
          <h1 className="header__title">Little Kniths Story </h1>
        </Link>
      </div>
    </section>
  );
};

export default Header;
