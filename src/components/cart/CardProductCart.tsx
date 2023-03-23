import { useState, useCallback, useEffect } from "react";
import { Card, Form } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { increaseProductAmount, decreaseProductAmount, removeFromCart, updateProductPrice } from "../features/products/cartSlice";

import { PICTURE_BASE_URL, useGetProductQuery } from "../features/api/apiSlice";
import { useTranslation } from "react-i18next";
import Spinner from "../utils/Spinner";
import PageError from "../../pages/PageError";

import { convertToNumber, convertToCurrency } from "../../utils/convertPrice";

const CardProductCart = ({ productSlug }: { productSlug: string }) => {
  const { t, i18n } = useTranslation();
  const [formattedPrice, setFormattedPrice] = useState<string>("")
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handler = useCallback((): void => {
    setIsChecked(!isChecked);
  }, [isChecked]);
  
  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetProductQuery({ slug: productSlug, lang: i18n.language });

  const cartProduct = useAppSelector((state) => state.cart.products.find(product => product.slug === productSlug))!

  const decreaseCountProduct = (): void => {
    if (product) {
      dispatch(decreaseProductAmount(product))
    };
  }
  
  const increaseCountProduct = (): void => {
    if (product) {
      dispatch(increaseProductAmount(product))
    }
  };

  const spinner = (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )

  // Convert, calculate and format prices 
  useEffect(() => {
    if (product && cartProduct) {
      const convertedPrice: number = convertToNumber(product?.price, i18n.language)
      const totalProductPrice = convertedPrice * cartProduct.amount
      const formattedPrice = convertToCurrency(totalProductPrice, i18n.language)
      
      setFormattedPrice(formattedPrice)
    } 
  }, [product, cartProduct, i18n.language])

  useEffect(() => {
    if (product) {
      dispatch(updateProductPrice(product))
    }
  }, [product?.price])
  
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
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
              <div className="product-card__modal-quick-purchase-title">{product?.title}</div>

              <div className="product-card__modal-quick-purchase-part-number">
                {t("Modal.code")}: {product?.code}
              </div>
              <div className="product-card__modal-quick-purchase-color">
                <>
                  {t("color")}
                  {product?.colors.map((color) => (
                    <div
                      key={color.color}
                      style={{ backgroundColor: color.color }}
                      className="card-lks__color-circle"
                    ></div>
                  ))}
                </>
              </div>
            </div>
          </div>
          <div className="schema-card__counter">
            <button className="schema-card__counter-control-btn" onClick={decreaseCountProduct}>
              -
            </button>
            {cartProduct?.amount}
            <button className="schema-card__counter-control-btn" onClick={increaseCountProduct}>
              +
            </button>
          </div>

          <div className="product-card__modal-quick-purchase-wrapper-price">
              {t("price")}: {isFetching && spinner} {!isFetching && formattedPrice}
              
          </div>
          
          {product && (
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
          )}
        </Card.Body>
      </Card>
      
    </div>
  );
};

export default CardProductCart;
