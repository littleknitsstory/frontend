import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAddSubscriptionMutation } from "../../components/features/api/apiSlice";
// components
import Social from "../../components/Social";
import PrimaryNav from "../../components/primary-nav/PrimaryNav";
import useModalState from "../../components/hooks/useModalState";
import ModalThanks from "../../components/modal/ModalThanks";

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [addSubscribe, { isLoading }] = useAddSubscriptionMutation();
  const { showModalThanks, handleShowThanks, handleClose } = useModalState();

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!isLoading) {
      try {
        await addSubscribe(email).unwrap();
        setEmail("");
        handleShowThanks();
      } catch (err) {
        console.error("Failed to subscribe: ", err);
      }
    }
  };

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
                {/* Temporary comment out */}
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
                <div className="footer__subscribe-text">{t("Footer.subscribe.text")}</div>
                <Form onSubmit={handleSubscribe}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control
                      required
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
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
        <ModalThanks
          showModal={showModalThanks}
          handleClose={handleClose}
          title={t("Modal.titleThanks.thanks")}
          button={false}
          message={
            <>
              <p>{t("Modal.thanksText.subscription")}</p>
            </>
          }
        />

        <div className="footer__end">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__rights">
                Little Knits Story {new Date().getFullYear()} | All Rights Reserved
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
