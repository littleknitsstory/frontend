import React, { useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAddSubscriptionMutation } from "../features/api/apiSlice";
// components
import Social from "./Social";
import PrimaryNav from "./atoms/primary-nav/PrimaryNav";

const Footer = () => {
  const { t } = useTranslation();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [addSubscribe, { isLoading }] = useAddSubscriptionMutation()

  const handleSubscribe = async (): Promise<void> => {
    if (!isLoading) {
      try {
        await addSubscribe(email).unwrap()
        setEmail("")
      } catch (err) {
        console.error("Failed to subscribe: ", err);
      }
    }
  }

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
                <Form>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <button 
                      className="btn btn_border" 
                      type="button"
                      onClick={handleSubscribe}
                    >
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

      <Modal
        show={isModalShown}
        onHide={() => setIsModalShown(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-header-without-border">
          <Modal.Title id="contained-modal-title-vcenter">
            {t("Modal.thanks")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-modal-thanks__text">
            <p>{t("Modal.subscription")}</p>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Footer;
