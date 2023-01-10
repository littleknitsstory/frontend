import React from "react";
import Container from "react-bootstrap/Container";
import logo from "../images/logo.png";

const Header = () => {
  return (
    <section className="header">
      <Container>
        <div className="row">
          <div className="col-12">
            <div className="header__logo">
              <img src={logo} alt="logo" />
              <div className="header__text">Блог и магазин по вязанию</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Header;
