import React, { useCallback, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { IProduct, IProductDetails } from "../api/models";
import arrowRight from "../icons/arrow-right.svg";
import questionInfo from "../icons/question.svg";
import Social from "./Social";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addProduct } from "../store/savedProductSlice";

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

  const dispatch = useAppDispatch();
  const [colorSavedProduct, setColorSavedProduct] = useState<string>("#000");

  const addSavedProduct = useCallback(
    (product: IProduct | IProductDetails): void => {
      dispatch(addProduct(product));
      setColorSavedProduct("#883d3b");
    },
    [colorSavedProduct]
  );

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

            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="schema-card__svg-like"
              onClick={() => addSavedProduct(product)}
            >
              <path
                d="M29.7321 4.50026C28.2201 3.0238 26.131 2.28589 23.4641 2.28589C22.726 2.28589 21.9728 2.41386 21.2051 2.66967C20.4371 2.92567 19.7227 3.27105 19.0625 3.70555C18.4016 4.13993 17.8335 4.54785 17.357 4.92869C16.881 5.30966 16.4285 5.71452 16 6.14296C15.5713 5.71452 15.1189 5.30966 14.6429 4.92869C14.1665 4.54785 13.5982 4.14018 12.9374 3.70555C12.2767 3.27086 11.5623 2.92573 10.7945 2.66967C10.0268 2.41392 9.27365 2.28589 8.53561 2.28589C5.86885 2.28589 3.7797 3.02399 2.26784 4.50026C0.75599 5.9764 0 8.02389 0 10.6429C0 11.4406 0.140102 12.2623 0.419744 13.1071C0.699386 13.9523 1.01806 14.6727 1.37513 15.2678C1.73214 15.8629 2.137 16.4432 2.58939 17.0087C3.04178 17.5742 3.3724 17.9639 3.58049 18.1782C3.78877 18.3925 3.95251 18.5474 4.07154 18.6427L15.2142 29.3928C15.4286 29.607 15.6905 29.7145 15.9999 29.7145C16.3094 29.7145 16.5715 29.607 16.7857 29.3928L27.9107 18.6781C30.6369 15.9523 31.9999 13.2737 31.9999 10.6427C32 8.02346 31.2441 5.97615 29.7321 4.50026ZM26.3571 16.9998L16 26.9818L5.62523 16.9817C3.39898 14.7561 2.28604 12.6427 2.28604 10.6427C2.28604 9.67854 2.41401 8.82723 2.66983 8.08932C2.92582 7.35128 3.25319 6.76479 3.65198 6.33028C4.05083 5.89565 4.53588 5.54177 5.10729 5.26775C5.67902 4.99399 6.23849 4.80942 6.78602 4.71423C7.33354 4.61916 7.91678 4.57156 8.53592 4.57156C9.15487 4.57156 9.82167 4.72317 10.5359 5.02683C11.2501 5.33036 11.9078 5.71133 12.5089 6.1696C13.1102 6.62819 13.6251 7.05669 14.0538 7.45535C14.4823 7.85439 14.8393 8.22022 15.1251 8.55359C15.3393 8.8156 15.6312 8.94657 16.0001 8.94657C16.3691 8.94657 16.6607 8.8156 16.8751 8.55359C17.1608 8.22022 17.518 7.85421 17.9465 7.45535C18.3751 7.05669 18.89 6.62837 19.491 6.1696C20.0923 5.71133 20.75 5.33036 21.4646 5.02683C22.1786 4.72323 22.8456 4.57156 23.4646 4.57156C24.0836 4.57156 24.6666 4.61916 25.2144 4.71423C25.7621 4.80936 26.3216 4.99399 26.8931 5.26775C27.4646 5.5417 27.9497 5.89584 28.3484 6.33028C28.7472 6.76479 29.0747 7.35128 29.3307 8.08932C29.5862 8.82723 29.7142 9.67854 29.7142 10.6427C29.7141 12.6427 28.5953 14.7619 26.3571 16.9998Z"
                fill={colorSavedProduct}
              />
            </svg>
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
                src={product.image_preview}
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
