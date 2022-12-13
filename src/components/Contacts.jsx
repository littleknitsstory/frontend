import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Contacts = () => {
  return (
    <div className="lks-container">
      <div className="contacts">
        <div className="row">
          <div className="col-9">
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
                    type="textarea"
                    placeholder="Сообщение"
                  />
                </Form.Group>
              </Row>

              <button variant="primary" type="submit">
                Submit
              </button>
            </Form>
          </div>
          <div className="col-3">
            <div className="contact-info">fSzdghtfjy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
