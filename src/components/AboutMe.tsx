import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import kate from "../images/kate.png";
import vk from "../icons/logo-vk_white.svg";
import facebook from "../icons/logo-facebook_white.svg";
import instagram from "../icons/logo-instagram_white.svg";
import telegram from "../icons/telegram.svg";
import { useTranslation } from "react-i18next";

const AboutMe = () => {
  const { t } = useTranslation()
  
  return (
    <section className="about-me">
      <Container>
        <h3 className="title">{t("AboutMe.title", "Обо мне")}</h3>
        <Row>
          <Col xs={12} md={12} lg={6} xl={6} xxl={6} className="about-me__card">
            <div className="coffee-card">
              <div className="about-me__subtitle">{t("AboutMe.author")}</div>
              <div className="coffee-card__title">{t("AboutMe.authorName")}</div>
              <Row>
                <Col
                  xs={12}
                  md={12}
                  lg={12}
                  xl={6}
                  xxl={6}
                  className="about-me__img-wrapper"
                >
                  <img className="about-me__img" src={kate} alt="kate-author" />
                </Col>
                <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                  <div className="about-me__descr">
                    {t("AboutMe.descr")}
                  </div>
                </Col>

                <Row>
                  <Col>
                    <div className="about-me__social">
                      <a
                        href="https://vk.com/littleknitsstory"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={vk} alt="vk" />
                      </a>
                      <a
                        href="https://www.facebook.com/littleknitsstory/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={facebook} alt="facebook" />
                      </a>
                      <a
                        href="https://www.instagram.com/littleknitsstory/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={instagram} alt="instagram" />
                      </a>
                      <a href="#" target="_blank" rel="noreferrer">
                        <img src={telegram} alt="telegram" />
                      </a>
                    </div>
                  </Col>
                </Row>
              </Row>
            </div>
          </Col>
          <Col
            xs={12}
            md={12}
            lg={6}
            xl={6}
            xxl={6}
            className="about-me__text-wrapper"
          >
            <div className="about-me__title-text">
              Knitting makes me feel happy
            </div>
            <div className="about-me__text">
              Knitting makes me feel happy Knitting makes me feel happy Knitting
              makes me feel happy Knitting makes me feel happy Knitting makes me
              feel happy Knitting makes me feel happy Knitting makes me feel
              happy Knitting makes me feel happy Knitting makes me feel happy
              Knitting makes me feel happy Knitting makes me feel happy Knitting
              makes me feel happy Knitting makes me feel happy Knitting makes me
              feel happy Knitting makes me feel happy Knitting makes me feel
              happy Knitting makes me feel happy Knitting makes me feel happy
              Knitting makes me feel happy Knitting makes me feel happy Knitting
              makes me feel happy
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutMe;
