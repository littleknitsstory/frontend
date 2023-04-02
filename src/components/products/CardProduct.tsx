import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Store } from "react-notifications-component";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addFavorite, removeFavorite } from "../features/products/productsSlice";
import { addToCart } from "../features/products/cartSlice";

import ModalMain from "../modal/ModalMain";
import useModalState from "../hooks/useModalState";
import ModalThanks from "../modal/ModalThanks";
import { PICTURE_BASE_URL, useGetProductQuery } from "../features/api/apiSlice";
import PageError from "../../pages/PageError";
import { IProductDetails } from "../../app/types";
import { notificationSuccess, notificationError } from "../modal/Notification";
import { ReactComponent as BagIcon } from "../../assets/icons/bag-coffee.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like_coffee.svg";
import { ROUTES } from "../../app/routes";

const CardProduct = ({ productSlug }: { productSlug: string }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const { showModal, showModalThanks, handleShow, handleClose, onSubmitOrder } = useModalState();

  const {
    data: product,
    isError,
    error,
  } = useGetProductQuery({ lang: i18n.language, slug: productSlug });

  const favoriteProducts = useAppSelector((state) => state.products.favorite);
  const cartProducts = useAppSelector((state) => state.cart.products);

  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  const addFavoriteProduct = (product: IProductDetails): void => {
    dispatch(addFavorite(product));
    if (!favoriteProducts.some((item) => item.id === product.id)) {
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
    dispatch(addToCart({ ...product, amount: 1 }));
    if (!cartProducts.some((item) => item.id === product.id)) {
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
    <div className="card-lks product-card">
      {product && (
        <Card style={{ width: "18rem" }}>
          <div
            className="card-lks__wrapper-close"
            onClick={() => dispatch(removeFavorite(product))}
          >
            <span></span>
            <span></span>
          </div>
          <Link to={ROUTES.PRODUCTS + product?.slug}>
            <Card.Img
              variant="top"
              alt={product?.image_alt}
              src={PICTURE_BASE_URL + product?.image_preview}
            />
          </Link>

          <Card.Body>
            <Card.Title>{product?.title}</Card.Title>
            <div className="card-lks__wrapper-icons">
              <LikeIcon onClick={() => addFavoriteProduct(product)} />
              <BagIcon onClick={() => addProductInCart(product)} />
            </div>
            <div className="card-lks__material">
              {t("CardProduct.material")}: {product.material}
            </div>
            <div className="card-lks__color">
              {t("CardProduct.color")}:
              {product?.colors.map((color) => (
                <div
                  key={color.color}
                  style={{ backgroundColor: color.color }}
                  className="card-lks__color-circle"
                ></div>
              ))}
            </div>
            <div className="card-lks__price">{product?.price}</div>
            <button className="btn btn--primary card-lks__btn " onClick={handleShow}>
              {t("CardProduct.buttonQuickOrderText")}
            </button>
          </Card.Body>
        </Card>
      )}

      <div className="product-card__modal-quick-purchase">
        {product && (
          <ModalMain
            product={product}
            showModal={showModal}
            handleClose={handleClose}
            onSubmitOrder={() => onSubmitOrder()}
          />
        )}
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

export default CardProduct;
