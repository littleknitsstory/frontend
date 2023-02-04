import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import vk from "../icons/logo-vk_white.svg";
import facebook from "../icons/logo-facebook_white.svg";
import pinterest from "../icons/logo-pinterest_white.svg";
import instagram from "../icons/logo-instagram_white.svg";
import Social from "./Social";

const Footer = () => {
  return (
    <section className="footer">
      <Container>
        <div className="footer__wrapper">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__subtitle">Блог и магазин по вязанию</div>
              <div className="footer__title">Little Knits Story</div>
              <Row>
                <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
                  <div className="footer__navbar">
                    <ul>
                      <NavLink to="/shop">
                        <li>магазин</li>
                      </NavLink>

                      <NavLink to="/blog">
                        <li>блог</li>
                      </NavLink>

                      <li>
                        <a href="#">схемы</a>
                      </li>

                      <NavLink to="/contacts">
                        <li>КОНТАКТЫ</li>
                      </NavLink>
                    </ul>
                  </div>
                </Col>
                <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
                  <div className="footer__links-account">
                    <div className="footer__links-account footer__links-account-title">
                      личный кабинет
                    </div>
                    <ul>
                      <li>
                        <a href="#">Войти</a>
                      </li>
                      <li>
                        <a href="#">Корзина</a>
                      </li>
                      <li>
                        <a href="#">Сохраненные товары</a>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__subscribe">
                <div className="footer__subscribe-text">
                  Мы проводим специальные акции для наших клиентов. Оформите
                  подписку и мы будем держать вас в курсе
                </div>
                <Form>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="email" placeholder="Ваш e-mail" />

                    <button className="btn btn_border">
                      <div className="btn__text btn__text_center">
                        Подписаться
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
