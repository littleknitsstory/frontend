import React, { useCallback, useState, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import Social from "./Social";
import PrimaryNav from "./atoms/primary-nav/PrimaryNav";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { usePost } from "./Hooks/useFetch";
import ModalThanks from "./atoms/modal/ModalThanks";
import useModalState from "./Hooks/useModalState";
import { Namespace } from "i18next";

const Footer = () => {
  const { t } = useTranslation<Namespace<"translation">>()
  const [email, setEmail] = React.useState<string>("");
  const [isFormReady, setIsFormReady] = useState(false)
  const {showModalThanks, setShowModalThanks, handleCloseThanks} = useModalState()


  const {data, error, postData} = usePost({
    url: "SUBSCRIBE",
    method: "POST",
    body: {"email": email},
    isFormReady: isFormReady
  })

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    []
  );

  useEffect(() => {
    if (data) {
      setEmail("")
      setIsFormReady(false)
      setShowModalThanks(true)
    } else {
      setIsFormReady(false)
    }
  }, [data, error, postData])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setIsFormReady(true)
  }
  
  return (
    <section className="footer">
      <Container>
        <div className="footer__wrapper">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="footer__subtitle">
                {t("Footer.subtitle")}
              </div>
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
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control
                      type="email"
                      placeholder={t("Footer.subscribe.email")}
                      required
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
        <ModalThanks 
          showModal={showModalThanks}
          handleClose={handleCloseThanks}
          title={t("Modal.titleThanks.thanks")}
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
