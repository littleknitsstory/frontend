import React, { useCallback } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import Social from "./Social";
import PrimaryNav from "./atoms/primary-nav/PrimaryNav";
import { postSubscribeRequest } from "../api";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  const [email, setEmail] = React.useState<string>("");
  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setEmail(event.target.value);
    },
    []
  );

  const handleSubscribe = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      await postSubscribeRequest({
        email,
      });
      setEmail("");
    },
    [email]
  );
  return (
    <section className="footer">
      <Container>
        <div className="footer__wrapper">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__subtitle">{t("Footer.subtitle")}</div>
              <div className="footer__title">Little Knits Story</div>
              <Row>
                <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
                  <div className="footer__navbar">
                    <PrimaryNav type={"footer"} />
                  </div>
                </Col>
                {/* <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
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
                </Col> */}
              </Row>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__subscribe">
                <div className="footer__subscribe-text">
                  {t("Footer.subscribe.text")}
                </div>
                <Form onSubmit={handleSubscribe}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control
                      type="email"
                      placeholder="Ваш e-mail"
                      value={email}
                      onChange={handleEmailChange}
                    />

                    <button className="btn btn_border" type="submit">
                      <div className="btn__text btn__text_center">
                        {t("Footer.subscribe.buttonText")}
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
                Little Knits Story {new Date().getFullYear()} | All Rights
                Reserved
              </div>
            </Col>

            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <Link to="/privacyPolicy" className="footer__policy">
                {t("Footer.policy")}
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Footer;
