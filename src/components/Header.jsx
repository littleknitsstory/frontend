import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import logo from "../images/logo.png";

const Header = () => {
  const { t } = useTranslation()

  return (
    <section className="header">
      <Container>
        <Row>
          <Col>
            <div className="header__logo">
              <img src={logo} alt="logo" />
                <div className="header__text">
                  {t("Header.title")}  {/* Блог и магазин по вязанию */}
                </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Header;
