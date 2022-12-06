import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="header">
      <Container>
        <div className="row">
          <div className="col-12">
            <div className="header__label">Блог и магазин по вязанию</div>
            <Link to="/">
              <h1 className="header__title">Little Kniths Story </h1>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Header;
