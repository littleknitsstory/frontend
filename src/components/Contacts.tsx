import React, { useCallback, useState, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

import { postContactRequest } from "../api";
import envelope from "../icons/envelope.svg";
import map from "../icons/map-point.svg";
import phone from "../icons/phone.svg";
import { usePost } from "./Hooks/useFetch";
import { IContactRequest } from "../api/models";

const Contacts = () => {
  const { t } = useTranslation()
  const [showModalThanks, setShowModalThanks] = useState<boolean>(false);
  const [isFormReady, setIsFormReady] = useState(false)

  const [formData, setFormData] = useState<IContactRequest>({
    name: "",
    message: "",
    email: "",
    company: "",
    phone_number: ""
  })

  const { data, error } = usePost<boolean>({
    url: "CONTACTS",
    method: "POST",
    body: {...formData},
    isFormReady: isFormReady
  })

  const onSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFormReady(true)
  }
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = e.target
    setFormData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const clearForm = useCallback((): void => {
    setFormData({
      name: "",
      message: "",
      email: "",
      company: "",
      phone_number: ""
    })
  }, []);

  useEffect(() => {
    if (data) {
      clearForm()
      setShowModalThanks(true)
      setIsFormReady(false)
    } else {
      console.log(error?.status, error?.text)
      setIsFormReady(false)
    }
  }, [data, error])

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
              <div className="coffee-card__title">
                {t("Contacts.title")}
              </div>
              <Form className="contacts__form" onSubmit={onSubmitOrder}>
                <Row>
                  <Form.Group as={Col} md="6" controlId="name">
                    <Form.Control
                      required
                      type="text"
                      placeholder={t('Contacts.name')}
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="theme">
                    <Form.Control
                      type="text"
                      placeholder={t('Contacts.subject')}
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} md="12" controlId="phone">
                    <Form.Control
                      required
                      type="text"
                      placeholder={t('Contacts.phone')}
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="email">
                    <Form.Control
                      required
                      type="email"
                      placeholder="Е-mail"
                      value={formData.email}
                      name="email"
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="12" controlId="message">
                    <Form.Control
                      required
                      as="textarea"
                      placeholder={t("Contacts.message")}
                      value={formData.message}
                      name="message"
                      onChange={handleFormChange}
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

              <div className="contacts__policy">
                {t("Contacts.policy")}
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
              <div className="title">
                {t("Contacts.contactInfo")}
              </div>
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
                <p>
                  {t("Modal.thanksText1")}
                </p> 
                <p>
                  {t("Modal.thanksText2")}
                </p> 
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
