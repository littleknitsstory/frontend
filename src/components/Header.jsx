import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assests/images/logo.png";

const Header = () => {
  return (
    <section className="header">
      <Container>
        <div className="row">
          <div className="col-12">
            <Link to="/">
              <img src={logo} alt="logo" />
              <h1 className="header__title">Little Knits Story </h1>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Header;
