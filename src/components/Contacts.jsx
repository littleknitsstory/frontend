import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";

import map from "../assests/images/map-point.svg";
import envelope from "../assests/images/envelope.svg";
import phone from "../assests/images/phone.svg";

const Contacts = () => {
  const { t } = useTranslation();
  return (
    <div className="lks-container">
      <div className="contacts">
        <div className="row">
          <div className="col-xl-8 col-lg-8 contacts__box">
            <div className="form-head">Оставьте нам сообщение</div>
            <Form className="contact-form">
              <Row className="mb-2">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Control required type="text" placeholder="Ваше имя" />
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formBasicEmail">
                  <Form.Control required type="email" placeholder="E-mail" />
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Ваш телефон"
                  />
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Control type="email" placeholder="Компания / Автор" />
                </Form.Group>
              </Row>
              <Row className="mb-1">
                <Form.Group as={Col} md="12" controlId="validationCustom04">
                  <Form.Control
                    required
                    as="textarea"
                    placeholder="Сообщение"
                  />
                </Form.Group>
              </Row>
            </Form>
            <button className="lks-btn submit lks-btn-main" type="submit">
              {t("Submit")}
            </button>
            <div className="agreement">
              Нажимая «Отправить», вы даете согласие на обработку персональных
              данных
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 contact-info">
            <div className="contact-info__title">Контактная информация</div>
            <div className="contact-info__wrapper">
              <img src={map} alt="" />
              <div className="contact-info__text">
                Serbia, Karadjordjeva 9. Rudnik
              </div>
            </div>
            <div className="contact-info__wrapper">
              <img src={phone} alt="" />
              <div className="contact-info__text">8 800 665 00 88</div>
            </div>
            <div className="contact-info__wrapper">
              <img src={envelope} alt="" />
              <div className="contact-info__text">mail@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Contacts);
