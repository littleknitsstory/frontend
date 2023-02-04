import React, { useState, useCallback } from "react";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";

import cardImgProduct from "../images/product-img.png";

const CardProductCart = () => {
  const [countProduct, setCountProduct] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const increaseCountProduct = () => {
    setCountProduct((countProduct) => countProduct + 1);
  };

  const decreaseCountProduct = () => {
    if (countProduct == 1) {
      return;
    }
    setCountProduct((countProduct) => countProduct - 1);
  };

  const handler = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  return (
    <div className="product-card__cart">
      <Card className={isChecked ? "product-card__cart-active" : "card"}>
        <Card.Body>
          <Form.Check aria-label="option 1" onChange={handler} />

          <img
            className="product-card__cart-img"
            src={cardImgProduct}
            alt="cardImgProduct"
          />
          <div className="product-card__cart-wrapper">
            <div className="product-card__modal-quick-purchase-descr">
              <div className="product-card__modal-quick-purchase-title">
                Cхема "Русалочка"
              </div>

              <div className="product-card__modal-quick-purchase-part-number">
                Артикул: 56356635
              </div>
              <div className="product-card__modal-quick-purchase-color">
                Цвет:{" "}
              </div>
            </div>
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

          <div className="product-card__modal-quick-purchase-wrapper-price">
            Стоимость: 12 555
          </div>
          <button
            className={
              isChecked
                ? "product-card__cart-btn-deleted-active"
                : "product-card__cart-btn-deleted"
            }
          >
            Ｘ
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProductCart;
