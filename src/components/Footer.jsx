import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import vk from "../icons/logo-vk_white.svg";
import facebook from "../icons/logo-facebook_white.svg";
import pinterest from "../icons/logo-pinterest_white.svg";
import instagram from "../icons/logo-instagram_white.svg";
import Social from "./Social";

import { Trans } from "react-i18next";

const Footer = () => {
  return (
    <section className="footer">
      <Container>
        <div className="footer__wrapper">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__subtitle">
                <Trans i18nKey="Footer.subtitle">
                  Блог и магазин по вязанию
                </Trans>
              </div>
              <div className="footer__title">Little Knits Story</div>
              <Row>
                <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
                  <div className="footer__navbar">
                    <ul>
                      <NavLink to="/shop">
                        <li>
                          <Trans i18nKey="Footer.NavLink.shop">
                            магазин
                          </Trans>
                        </li>
                      </NavLink>

                      <NavLink to="/blog">
                        <li>
                          <Trans i18nKey="Footer.NavLink.blog">
                            блог
                          </Trans>
                        </li>
                      </NavLink>

                      <li>
                        <a href="#">
                          <Trans i18nKey="Footer.NavLink.patterns">
                            схемы
                          </Trans>
                        </a>
                      </li>

                      <NavLink to="/contacts">
                        <li>
                          <Trans i18nKey="Footer.NavLink.contacts">
                            КОНТАКТЫ
                          </Trans>
                        </li>
                      </NavLink>
                    </ul>
                  </div>
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
                  <div className="footer__links-account">
                    <div className="footer__links-account footer__links-account-title">
                      <Trans i18nKey="Footer.personalAccount">
                        личный кабинет
                      </Trans>
                    </div>
                    <ul>
                      <li>
                        <a href="#">
                          <Trans i18nKey="Footer.login">
                            Войти
                          </Trans>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Trans i18nKey="Footer.cart">
                            Корзина
                          </Trans>
                        </a>
                      </li>
                      <li>
                        <a href="/saved">
                          <Trans i18nKey="Footer.savedProducts">
                            Сохраненные товары
                          </Trans>
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__subscribe">
                <div className="footer__subscribe-text">
                  <Trans i18nKey="Footer.subscribe.text">
                    Мы проводим специальные акции для наших клиентов. Оформите
                    подписку и мы будем держать вас в курсе
                  </Trans>
                </div>
                <Form>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="email" placeholder="E-mail" />

                    <button className="btn btn_border">
                      <div className="btn__text btn__text_center">
                        <Trans i18nKey="Footer.subscribe.buttonText">
                          Подписаться
                        </Trans>
                      </div>
                    </button>
                  </Form.Group>
                </Form>
              </div>

              <Social />
            </Col>
          </Row>
        </div>

        <div className="footer__end">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__rights">
                Little Knits Story 2017 | All Rights Reserved
              </div>
            </Col>

            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__policy">Политика конфеденциальности</div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Footer;
