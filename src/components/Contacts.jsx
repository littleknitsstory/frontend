import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import map from "../icons/map-point.svg";
import envelope from "../icons/envelope.svg";
import phone from "../icons/phone.svg";

const Contacts = () => {
  return (
    <section className="contacts">
      <Container>
        <Row>
          <Col
            xs={{ span: 12, offset: 0 }}
            md={{ span: 12, offset: 0 }}
            lg={{ span: 8, offset: 2 }}
            xl={{ span: 6, offset: 3 }}
            xxl={{ span: 6, offset: 3 }}
          >
            <div className="coffee-card">
              <div className="coffee-card__title">Оставьте нам сообщение</div>
              <Form className="contacts__form">
                <Row>
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Control required type="text" placeholder="Ваше имя" />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Control type="text" placeholder="Тема сообщения" />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} md="12" controlId="validationCustom02">
                    <Form.Control required type="text" placeholder="Телефон" />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="formBasicEmail">
                    <Form.Control required type="email" placeholder="Е-mail" />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="12" controlId="validationCustom04">
                    <Form.Control
                      required
                      as="textarea"
                      placeholder="Сообщение"
                    />
                  </Form.Group>
                </Row>
              </Form>

              <button
                className="btn btn_white btn_center contacts__btn"
                type="submit"
              >
                <div className="btn__text btn__text_center">Отправить</div>
              </button>
              <div className="contacts__policy">
                Нажимая «Отправить», вы даете согласие на обработку персональных
                данных
              </div>
            </div>
          </Col>
        </Row>
        <div className="contacts__info">
          <Row>
            <Col
              xs={{ span: 12, offset: 0 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 8, offset: 2 }}
              xl={{ span: 6, offset: 3 }}
              xxl={{ span: 6, offset: 3 }}
            >
              <div className="title">Контактная информация</div>
              <div className="contacts__wrapper-info">
                <img src={map} alt="map" />
                <div className="contacts__text">Montenegro, Budva</div>
              </div>
              <div className="contacts__wrapper-info">
                <img src={phone} alt="phone" />
                <a href="tel:+38267000000" class="contacts__text">
                  +382 67 00 00 00
                </a>
              </div>
              <div className="contacts__wrapper-info">
                <img src={envelope} alt="envelope" />
                <a
                  href="mailto:littleknitsstory@mail.com"
                  class="contacts__text"
                >
                  littleknitsstory@mail.com
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Contacts;
