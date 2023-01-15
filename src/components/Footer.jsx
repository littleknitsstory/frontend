import React from "react";
import { Container, Form } from "react-bootstrap";
import vk from "../icons/logo-vk_white.svg";
import facebook from "../icons/logo-facebook_white.svg";
import pinterest from "../icons/logo-pinterest_white.svg";
import instagram from "../icons/logo-instagram_white.svg";

const Footer = () => {
  return (
    <section className="footer">
      <Container>
        <div className="footer__wrapper">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-xs-12">
              <div className="footer__subtitle">Блог и магазин по вязанию</div>
              <div className="footer__title">Little Knits Story</div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-xs-12">
                  <div className="footer__navbar">
                    <ul>
                      <li>
                        <a href="">магазин</a>
                      </li>
                      <li>
                        <a href="">блог</a>
                      </li>
                      <li>
                        <a href="">схемы</a>
                      </li>
                      <li>
                        <a href="">контакты</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-xs-12">
                  <div className="footer__links-account">
                    <div className="footer__links-account footer__links-account-title">
                      личный кабинет
                    </div>
                    <ul>
                      <li>
                        <a href="">Войти</a>
                      </li>
                      <li>
                        <a href="">Корзина</a>
                      </li>
                      <li>
                        <a href="">Сохраненные товары</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-xs-12">
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

              <div className="footer__social">
                <div className="footer__social-circle">
                  <a
                    href="https://vk.com/littleknitsstory"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={vk} alt="vk" />
                  </a>
                </div>

                <div className="footer__social-circle">
                  <a
                    href="https://www.facebook.com/littleknitsstory/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={facebook} alt="facebook" />
                  </a>
                </div>
                <div className="footer__social-circle">
                  <a
                    href="https://www.instagram.com/littleknitsstory/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={instagram} alt="instagram" />
                  </a>
                </div>
                <div className="footer__social-circle">
                  <a
                    href="https://www.pinterest.ru/littleknitsstory/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={pinterest} alt="pinterest" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__end">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-xs-12">
              <div className="footer__rights">
                Little Knits Story 2017 | All Rights Reserved
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-xs-12">
              <div className="footer__policy">Политика конфеденциальности</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Footer;
