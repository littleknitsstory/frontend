import { useState, useCallback } from "react";
import { Card, Form } from "react-bootstrap";

import { useAppDispatch } from "../app/hooks";
import { removeFromCart } from "../features/products/productsSlice";

import { IProduct } from "../app/models";
import { PICTURE_BASE_URL, useGetProductQuery } from "../features/api/apiSlice";
import { useTranslation } from "react-i18next";
import Spinner from "./Spinner";
import Page404 from "./Page404";

const CardProductCart = ({ productSlug }: { productSlug: string }) => {
  const { t, i18n } = useTranslation()
  const [countProduct, setCountProduct] = useState<number>(1);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch()

  const increaseCountProduct = (): void => {
    setCountProduct((countProduct) => countProduct + 1);
  };

  const decreaseCountProduct = (): void => {
    if (countProduct === 1) {
      return;
    }
    setCountProduct((countProduct) => countProduct - 1);
  };

  const handler = useCallback((): void => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  const {
    data: product,
    isLoading,
    isError
  } = useGetProductQuery({ slug: productSlug, lang: i18n.language })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <Page404 />
  }

  return (
    <div className="product-card__cart">
      <Card className={isChecked ? "product-card__cart-active" : "card"}>
        <Card.Body>
          <Form.Check aria-label="option 1" onChange={handler} />

          <img
            className="product-card__cart-img"
            src={PICTURE_BASE_URL + product?.image_preview}
            alt="cardImgProduct"
          />
          <div className="product-card__cart-wrapper">
            <div className="product-card__modal-quick-purchase-descr">
              <div className="product-card__modal-quick-purchase-title">
                {product?.title}
              </div>

              <div className="product-card__modal-quick-purchase-part-number">
                {t("Modal.code")}: {product?.code}
              </div>
              <div className="product-card__modal-quick-purchase-color">
                <>
                  {t("color")} 
                  {product?.colors.map(color => 
                    <div 
                      key={color.color}
                      style={{backgroundColor: color.color}}
                      className="card-lks__color-circle"
                    >
                    </div>)
                  }
                </>
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
            {t("price")}: {product?.price}
          </div>
          {product &&
            <button
              className={
                isChecked
                  ? "product-card__cart-btn-deleted-active"
                  : "product-card__cart-btn-deleted"
              }
              onClick={() => dispatch(removeFromCart(product))}
            >
              Ｘ
            </button>
          }
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProductCart;
