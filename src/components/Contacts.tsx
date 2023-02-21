import React, { useCallback, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

import { postContactRequest } from "../api";
import envelope from "../icons/envelope.svg";
import map from "../icons/map-point.svg";
import phone from "../icons/phone.svg";

const Contacts = () => {
  const { t } = useTranslation();

  const [showModalThanks, setShowModalThanks] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [phone_number, setPhone_number] = useState<string>("");

  const clearForm = useCallback((): void => {
    setName("");
    setMessage("");
    setEmail("");
    setCompany("");
    setPhone_number("");
  }, []);

  const handleChange = useCallback(
    (
      handler: (value: string) => void
    ): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
      return (e) => {
        handler(e.target.value);
      };
    },
    []
  );

  const onSubmitOrder = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      const result = await postContactRequest({
        name,
        message,
        email,
        company,
        phone_number,
      });
      if (result) {
        setShowModalThanks(true);
        clearForm();
      }
    },
    [clearForm, company, email, message, name, phone_number]
  );

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
              <div className="coffee-card__title">{t("Contacts.title")}</div>
              <Form className="contacts__form" onSubmit={onSubmitOrder}>
                <Row>
                  <Form.Group as={Col} md="6" controlId="name">
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("Contacts.name")}
                      value={name}
                      onChange={handleChange(setName)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="theme">
                    <Form.Control
                      type="text"
                      placeholder={t("Contacts.subject")}
                      value={company}
                      onChange={handleChange(setCompany)}
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} md="12" controlId="phone">
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("Contacts.phone")}
                      value={phone_number}
                      onChange={handleChange(setPhone_number)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="email">
                    <Form.Control
                      required
                      type="email"
                      placeholder="Е-mail"
                      value={email}
                      onChange={handleChange(setEmail)}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="12" controlId="message">
                    <Form.Control
                      required
                      as="textarea"
                      placeholder={t("Contacts.message")}
                      value={message}
                      onChange={handleChange(setMessage)}
                    />
                  </Form.Group>
                </Row>
                <button
                  className="btn btn_white btn_center contacts__btn"
                  type="submit"
                >
                  <div className="btn__text btn__text_center">
                    {t("Contacts.send")}
                  </div>
                </button>
              </Form>

              <div className="contacts__policy">{t("Contacts.policy")}</div>
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
              <div className="title">{t("Contacts.contactInfo")}</div>
              <div className="contacts__wrapper-info">
                <img src={map} alt="map" />
                <div className="contacts__text">Montenegro, Budva</div>
              </div>
              <div className="contacts__wrapper-info">
                <img src={phone} alt="phone" />
                <a href="tel:+38267000000" className="contacts__text">
                  +382 67 00 00 00
                </a>
              </div>
              <div className="contacts__wrapper-info">
                <img src={envelope} alt="envelope" />
                <a
                  href="mailto:littleknitsstory@mail.com"
                  className="contacts__text"
                >
                  littleknitsstory@mail.com
                </a>
              </div>
            </Col>
          </Row>
        </div>
        <div className="card-modal-thanks">
          <Modal
            show={showModalThanks}
            onHide={() => setShowModalThanks(false)}
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
                <p>{t("Modal.thanksText1")}</p>
                <p>{t("Modal.thanksText2")}</p>
              </div>
              <Link to={`/`}>
                <button className="btn btn_vinous btn_center card-modal-thanks__btn">
                  <div className="btn__text btn__text_center">
                    {t("Modal.backHome")}
                  </div>
                </button>
              </Link>
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </section>
  );
};

export default Contacts;
