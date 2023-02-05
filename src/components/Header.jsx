import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import { Trans } from "react-i18next";

const Header = () => {
  return (
    <section className="header">
      <Container>
        <Row>
          <Col>
            <div className="header__logo">
              <img src={logo} alt="logo" />
              <div className="header__text">
                <Trans i18nKey="Header.title">
                  Блог и магазин по вязанию
                </Trans>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Header;
