import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";

const Header = () => {
  return (
    <section className="header">
      <Container>
        <Row>
          <Col>
            <div className="header__logo">
              <img src={logo} alt="logo" />
              <div className="header__text">Блог и магазин по вязанию</div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Header;
