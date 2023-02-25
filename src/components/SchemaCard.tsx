import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { IProductDetails } from "../app/models";
import arrowRight from "../icons/arrow-right.svg";
import like from "../icons/like.svg";
import questionInfo from "../icons/question.svg";
import Social from "./Social";
import { PICTURE_BASE_URL } from "../features/api/apiSlice";

const SchemaCard = ({ product }: { product: IProductDetails }) => {
  const { t } = useTranslation();
  const [showModalQuickPurchase, setShowModalQuickPurchase] =
    useState<boolean>(false);

  const [showModalThanks, setShowModalThanks] = useState<boolean>(false);

  const handleShow = (): void => {
    setShowModalQuickPurchase(true);
  };
  const handleClose = (): void => {
    setShowModalQuickPurchase(false);
    setShowModalThanks(false);
  };
  const onSubmitOrder = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowModalQuickPurchase(false);
    setShowModalThanks(true);
  };

  const [countProduct, setCountProduct] = useState<number>(1);
  const increaseCountProduct = (): void => {
    setCountProduct((countProduct) => countProduct + 1);
  };

  const decreaseCountProduct = (): void => {
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
              src={PICTURE_BASE_URL + product.image_preview}
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
            <div className="schema-card__discount">-15%</div>
          </div>

          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">
                {t("SchemaCard.figure")}
              </div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Русалка</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">
                {t("SchemaCard.size")}
              </div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">{product.height} см</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">
                {t("SchemaCard.material")}
              </div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">{product.material}</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">
                {t("SchemaCard.difficulty")}
              </div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Базовая</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">
                {t("SchemaCard.instruments")}
              </div>
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
                {t("SchemaCard.description")}
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
                  <div className="btn__text_center">
                    {t("SchemaCard.buttonAddCart")}
                  </div>
                </button>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 offset-xl-2 offset-lg-2 offset-md-2 col-xs-12 ">
                <Link to="/product">
                  {t("SchemaCard.details")}
                  <img src={arrowRight} alt="arrowRight" />
                </Link>
              </div>
            </div>
            <div className="schema-card__product-btn">
              <Col>
                <button className="btn btn_border">
                  <div className="btn__text_center">
                    {t("SchemaCard.buttonAddCart")}
                  </div>
                </button>
              </Col>
              <Col>
                <button
                  className="btn btn_vinous schema-card__quick-purchase"
                  onClick={handleShow}
                >
                  <div className="btn__text btn__text_center">
                    {t("quickOrder")}
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
            <Modal.Title>{t("Modal.title", "Быстрая покупка")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="product-card__modal-quick-purchase-body">
              <img
                className="product-card__modal-quick-purchase-img"
                src={PICTURE_BASE_URL + product.image_preview}
                alt={product.image_alt}
              />
              <div className="product-card__modal-quick-purchase-descr">
                <div className="product-card__modal-quick-purchase-title">
                  {product.title}
                </div>

                <div className="product-card__modal-quick-purchase-part-number">
                  {t("Modal.code")}: {product.code}
                </div>
                <div className="product-card__modal-quick-purchase-color">
                  {t("Modal.color")}:{" "}
                </div>
                <div className="product-card__modal-quick-purchase-wrapper">
                  <div className="product-card__modal-quick-purchase-wrapper-price">
                    {product.sale}
                  </div>
                  <div className="product-card__modal-quick-purchase-wrapper-discount">
                    {t("Modal.discount")} 555
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
                  placeholder={t("Modal.name")}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  required
                  type="text"
                  placeholder={t("Modal.phone")}
                />
              </Form.Group>
              <button type="submit" className="btn btn_vinous btn_center">
                <div className="btn__text btn__text_center">
                  {t("Modal.send")}
                </div>
              </button>
            </Form>
            <div className="product-card__modal-quick-purchase-policy">
              {t("Modal.policy")}
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
              {t("Modal.thanks")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-modal-thanks__text">
              {t("Modal.thanksText1")}
              <br /> {t("Modal.thanksText2")}
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
      <div className="card-modal-thanks"></div>
    </div>
  );
};

export default SchemaCard;
