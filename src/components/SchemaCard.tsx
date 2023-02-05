import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import { IProductDetails } from "../api/models";
import arrowRight from "../icons/arrow-right.svg";
import like from "../icons/like.svg";
import questionInfo from "../icons/question.svg";
import Social from "./Social";

const SchemaCard = ({ product }: { product: IProductDetails }) => {
  const [showModalQuickPurchase, setShowModalQuickPurchase] = useState(false);

  const [showModalThanks, setShowModalThanks] = useState(false);

  const handleShow = () => {
    setShowModalQuickPurchase(true);
  };
  const handleClose = () => {
    setShowModalQuickPurchase(false);
    setShowModalThanks(false);
  };
  const onSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModalQuickPurchase(false);
    setShowModalThanks(true);
  };

  const [countProduct, setCountProduct] = useState(1);
  const increaseCountProduct = () => {
    setCountProduct((countProduct) => countProduct + 1);
  };

  const decreaseCountProduct = () => {
    if (countProduct === 1) {
      return;
    }
    setCountProduct((countProduct) => countProduct - 1);
  };
  return (
    <div className="schema-card">
      <Row className="schema-card__card">
        <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
          <div className="schema-card__img-wrapper">
            <img
              className="schema-card__img"
              src={product.image_preview}
              alt={product.image_alt}
            />
            <a href="#">
              <img className="schema-card__like" src={like} alt="like" />
            </a>
          </div>
          <div className="schema-card__counter">
            <button
              className="schema-card__counter-control-btn"
              onClick={decreaseCountProduct}
            >
              -
            </button>
            {countProduct}
            <button
              className="schema-card__counter-control-btn"
              onClick={increaseCountProduct}
            >
              +
            </button>
          </div>
          <Social />
        </Col>
        <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
          <div className="schema-card__wrapper-title">
            <div className="title schema-card__title">{product.title}</div>
            <div className="schema-card__dicount">-15%</div>
          </div>

          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Фигура</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Русалка</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Размер</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">{product.height} см</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Материал</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">{product.material}</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Сложность</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Базовая</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Инструменты</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">
                Крючок, пряжа, наполнитель, иголка с большим ушком, замочек для
                обозначения ряда
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="schema-card__descr">
                Важно: не предусмотрено для тех, кто не умеет вязать
              </div>{" "}
              <div className="schema-card__price">{product.sale}</div>
              <div className="schema-card__old-price">{product.price}</div>
              <div className="schema-card__region">
                Ваш регион: Екатериновка
              </div>
              <div className="schema-card__delivery">
                Доставка почтой: 16– 19 июня — 99 ₽
                <img src={questionInfo} alt="question-info" />
              </div>
            </Col>
          </Row>
          <div className="row">
            <div className="btn__link">
              <div className="col-xl-6 col-lg-6 col-md-6 col-xs-12">
                <button className="btn btn_border">
                  <div className="btn__text">Добавить в корзину</div>
                </button>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 offset-xl-2 offset-lg-2 offset-md-2 col-xs-12 ">
                <Link to="/product">
                  Подробнее <img src={arrowRight} alt="arrowRight" />
                </Link>
              </div>
            </div>
            <div className="schema-card__product-btn">
              <Col>
                <button className="btn btn_border">
                  <div className="btn__text">Добавить в корзину</div>
                </button>
              </Col>
              <Col>
                <button
                  className="btn btn_vinous schema-card__quick-purchase"
                  onClick={handleShow}
                >
                  <div className="btn__text btn__text_center">
                    Быстрый заказ
                  </div>
                </button>
              </Col>
            </div>
          </div>
        </Col>
      </Row>
      <div className="product-card__modal-quick-purchase">
        <Modal show={showModalQuickPurchase} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Быстрая покупка</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="product-card__modal-quick-purchase-body">
              <img
                className="product-card__modal-quick-purchase-img"
                src={product.image_preview}
                alt={product.image_alt}
              />
              <div className="product-card__modal-quick-purchase-descr">
                <div className="product-card__modal-quick-purchase-title">
                  {product.title}
                </div>

                <div className="product-card__modal-quick-purchase-part-number">
                  Артикул: {product.code}
                </div>
                <div className="product-card__modal-quick-purchase-color">
                  Цвет:{" "}
                </div>
                <div className="product-card__modal-quick-purchase-wrapper">
                  <div className="product-card__modal-quick-purchase-wrapper-price">
                    {product.sale}
                  </div>
                  <div className="product-card__modal-quick-purchase-wrapper-discount">
                    Скидка 555
                  </div>
                </div>
              </div>
            </div>

            <Form onSubmit={onSubmitOrder}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  required
                  type="text"
                  placeholder="ФИО"
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control required type="text" placeholder="Телефон" />
              </Form.Group>
              <button type="submit" className="btn btn_vinous btn_center">
                <div className="btn__text btn__text_center">Отправить</div>
              </button>
            </Form>
            <div className="product-card__modal-quick-purchase-policy">
              Нажимая «Отправить», вы даете согласие на обработку персональных
              данных
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={showModalThanks}
          onHide={() => setShowModalThanks(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="modal-header-without-border">
            <Modal.Title id="contained-modal-title-vcenter">
              Спасибо
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-modal-thanks__text">
              Ваша заявка принята.
              <br /> В Ближайшее время с вами свяжется наш менеджер
            </div>
            <Link to={`/`}>
              <button className="btn btn_vinous btn_center card-modal-thanks__btn">
                <div className="btn__text btn__text_center">
                  Вернуться на главную
                </div>
              </button>
            </Link>
          </Modal.Body>
        </Modal>
      </div>
      <div className="card-modal-thanks"></div>
    </div>
  );
};

export default SchemaCard;
