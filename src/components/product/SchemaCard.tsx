import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Store } from "react-notifications-component";

import { IProductDetails } from "../../app/types";
import { PICTURE_BASE_URL } from "../features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addFavorite, addToCart } from "../features/products/productsSlice";
import useModalState from "../hooks/useModalState";
import { notificationSuccess, notificationError } from "../modal/Notification";
// components
import Social from "../Social";
import ModalThanks from "../modal/ModalThanks";
import ModalMain from "../modal/ModalMain";
// assets
import arrowRight from "../../assets/icons/arrow-right.svg";
import like from "../../assets/icons/like.svg";
import questionInfo from "../../assets/icons/question.svg";

const SchemaCard = ({ product }: { product: IProductDetails }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { showModal, showModalThanks, handleShow, handleClose, onSubmitOrder } = useModalState();
  const [countProduct, setCountProduct] = useState<number>(1);
  const favoriteProducts = useAppSelector((state) => state.products.favorite);
  const cartProducts = useAppSelector((state) => state.products.cart);

  const increaseCountProduct = (): void => {
    setCountProduct((countProduct) => countProduct + 1);
  };

  const decreaseCountProduct = (): void => {
    if (countProduct === 1) {
      return;
    }
    setCountProduct((countProduct) => countProduct - 1);
  };

  const addFavoriteProduct = (product: IProductDetails): void => {
    dispatch(addFavorite(product));
    if (!favoriteProducts.includes(product)) {
      Store.addNotification({
        ...notificationSuccess,
        title: t("Notification.isSaved"),
      });
    } else {
      Store.addNotification({
        ...notificationError,
        title: t("Notification.alreadySaved"),
      });
    }
  };

  const addProductInCart = (product: IProductDetails): void => {
    dispatch(addToCart(product));
    if (!cartProducts.includes(product)) {
      Store.addNotification({
        ...notificationSuccess,
        title: t("Notification.isAdded"),
      });
    } else {
      Store.addNotification({
        ...notificationError,
        title: t("Notification.alreadyAdded"),
      });
    }
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
            <img
              className="schema-card__like"
              src={like}
              alt="like"
              onClick={() => addFavoriteProduct(product)}
            />
          </div>
          <div className="schema-card__counter">
            <button className="schema-card__counter-control-btn" onClick={decreaseCountProduct}>
              -
            </button>
            {countProduct}
            <button className="schema-card__counter-control-btn" onClick={increaseCountProduct}>
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
              <div className="schema-card__property">{t("SchemaCard.figure")}</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Русалка</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">{t("SchemaCard.size")}</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">{product.height} см</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">{t("SchemaCard.material")}</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">{product.material}</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">{t("SchemaCard.difficulty")}</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Базовая</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">{t("SchemaCard.instruments")}</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">
                Крючок, пряжа, наполнитель, иголка с большим ушком, замочек для обозначения ряда
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="schema-card__descr">{t("SchemaCard.description")}</div>{" "}
              <div className="schema-card__price">{product.sale}</div>
              <div className="schema-card__old-price">{product.price}</div>
              <div className="schema-card__region">Ваш регион: Екатериновка</div>
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
                  <div className="btn__text_center">{t("SchemaCard.buttonAddCart")}</div>
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
              <button className="btn btn--primary" onClick={() => addProductInCart(product)}>
                {t("SchemaCard.buttonAddCart")}
              </button>
              <button className="btn btn--primary" onClick={handleShow}>
                {t("quickOrder")}
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <div className="product-card__modal-quick-purchase">
        <ModalMain
          product={product}
          showModal={showModal}
          handleClose={handleClose}
          onSubmitOrder={onSubmitOrder}
        />
        <ModalThanks
          showModal={showModalThanks}
          handleClose={handleClose}
          title={t("Modal.titleThanks.thanks")}
          button={true}
          message={
            <>
              <p>{t("Modal.thanksText.quickOrder1")}</p>
              <p>{t("Modal.thanksText.quickOrder2")}</p>
            </>
          }
        />
      </div>
      <div className="card-modal-thanks"></div>
    </div>
  );
};

export default SchemaCard;
