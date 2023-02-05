import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import cardImgProduct from "../images/product-img.png";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Trans } from "react-i18next";

const CardProduct = (props) => {
  const [showModalQuickPurchase, setShowModalQuickPurchase] = useState(false);

  const [showModalThanks, setShowModalThanks] = useState(false);

  const handleShow = () => {
    setShowModalQuickPurchase(true);
  };
  const handleClose = () => {
    setShowModalQuickPurchase(false);
    setShowModalThanks(false);
  };
  const onSubmitOrder = (e) => {
    e.preventDefault();
    setShowModalQuickPurchase(false);
    setShowModalThanks(true);
  };

  return (
    <div className="card-lks product-card">
      <Card style={{ width: "18rem" }}>
        <div className="card-lks__wrapper-close">
          <span></span>
          <span></span>
        </div>
        <Link to={`/product/${props.slug}`} data={props.title}>
          <Card.Img 
            variant="top" 
            src={"http://dev.backend.littleknitsstory.com" + props.image_preview} 
            alt={props.img_alt}
          />
        </Link>

        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <div className="card-lks__wrapper-icons">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="card-lks__svg-like"
            >
              <path
                d="M29.7321 4.50026C28.2201 3.0238 26.131 2.28589 23.4641 2.28589C22.726 2.28589 21.9728 2.41386 21.2051 2.66967C20.4371 2.92567 19.7227 3.27105 19.0625 3.70555C18.4016 4.13993 17.8335 4.54785 17.357 4.92869C16.881 5.30966 16.4285 5.71452 16 6.14296C15.5713 5.71452 15.1189 5.30966 14.6429 4.92869C14.1665 4.54785 13.5982 4.14018 12.9374 3.70555C12.2767 3.27086 11.5623 2.92573 10.7945 2.66967C10.0268 2.41392 9.27365 2.28589 8.53561 2.28589C5.86885 2.28589 3.7797 3.02399 2.26784 4.50026C0.75599 5.9764 0 8.02389 0 10.6429C0 11.4406 0.140102 12.2623 0.419744 13.1071C0.699386 13.9523 1.01806 14.6727 1.37513 15.2678C1.73214 15.8629 2.137 16.4432 2.58939 17.0087C3.04178 17.5742 3.3724 17.9639 3.58049 18.1782C3.78877 18.3925 3.95251 18.5474 4.07154 18.6427L15.2142 29.3928C15.4286 29.607 15.6905 29.7145 15.9999 29.7145C16.3094 29.7145 16.5715 29.607 16.7857 29.3928L27.9107 18.6781C30.6369 15.9523 31.9999 13.2737 31.9999 10.6427C32 8.02346 31.2441 5.97615 29.7321 4.50026ZM26.3571 16.9998L16 26.9818L5.62523 16.9817C3.39898 14.7561 2.28604 12.6427 2.28604 10.6427C2.28604 9.67854 2.41401 8.82723 2.66983 8.08932C2.92582 7.35128 3.25319 6.76479 3.65198 6.33028C4.05083 5.89565 4.53588 5.54177 5.10729 5.26775C5.67902 4.99399 6.23849 4.80942 6.78602 4.71423C7.33354 4.61916 7.91678 4.57156 8.53592 4.57156C9.15487 4.57156 9.82167 4.72317 10.5359 5.02683C11.2501 5.33036 11.9078 5.71133 12.5089 6.1696C13.1102 6.62819 13.6251 7.05669 14.0538 7.45535C14.4823 7.85439 14.8393 8.22022 15.1251 8.55359C15.3393 8.8156 15.6312 8.94657 16.0001 8.94657C16.3691 8.94657 16.6607 8.8156 16.8751 8.55359C17.1608 8.22022 17.518 7.85421 17.9465 7.45535C18.3751 7.05669 18.89 6.62837 19.491 6.1696C20.0923 5.71133 20.75 5.33036 21.4646 5.02683C22.1786 4.72323 22.8456 4.57156 23.4646 4.57156C24.0836 4.57156 24.6666 4.61916 25.2144 4.71423C25.7621 4.80936 26.3216 4.99399 26.8931 5.26775C27.4646 5.5417 27.9497 5.89584 28.3484 6.33028C28.7472 6.76479 29.0747 7.35128 29.3307 8.08932C29.5862 8.82723 29.7142 9.67854 29.7142 10.6427C29.7141 12.6427 28.5953 14.7619 26.3571 16.9998Z"
                fill="#C7B8A7"
              />
            </svg>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="card-lks__svg-bag"
            >
              <g clipPath="url(#clip0_605_6172)">
                <path
                  d="M5.7196 7.42864C5.7196 5.32857 7.42208 3.62609 9.52215 3.62609C11.6222 3.62609 13.3245 5.32857 13.3245 7.42864V10.6134L14.0593 9.94993C14.095 9.91726 14.1242 9.8783 14.1453 9.83508H14.2252V7.42864C14.2252 4.83119 12.1196 2.72534 9.52215 2.72534C6.92445 2.72534 4.81885 4.83119 4.81885 7.42864V9.83533H5.7196V7.42864Z"
                  fill="#C7B8A7"
                />
                <path
                  d="M22.1488 20.6527C21.9525 20.8055 21.9173 21.0885 22.0701 21.2848L22.4112 21.7228C22.6047 21.4597 22.7655 21.1737 22.8897 20.8716L22.7809 20.7316C22.6281 20.5353 22.3451 20.5001 22.1488 20.6527Z"
                  fill="#C7B8A7"
                />
                <path
                  d="M9.97225 12.8384C9.85111 12.8384 9.74505 12.9198 9.71363 13.0367C9.68221 13.1538 9.73348 13.2772 9.83854 13.3378C9.94335 13.3983 10.076 13.381 10.1615 13.2953C10.2382 13.2186 10.261 13.1035 10.2198 13.0035C10.1783 12.9035 10.0806 12.8384 9.97225 12.8384Z"
                  fill="#C7B8A7"
                />
                <path
                  d="M12.3793 15.5491C12.4931 14.8034 13.136 14.2535 13.8903 14.2565H17.1645L16.6463 10.5387C16.5825 10.1325 16.2316 9.8337 15.8204 9.83521H14.2253V12.1921C14.2253 12.441 14.0237 12.6425 13.7749 12.6425C13.5263 12.6425 13.3245 12.441 13.3245 12.1921V10.6138L12.18 11.6475L12.192 14.0437C12.1926 14.1467 12.1518 14.2457 12.079 14.3186L8.60991 17.7877C8.20402 18.1938 7.54554 18.1938 7.13965 17.7877L5.29065 15.9387C4.88451 15.5328 4.88451 14.8743 5.29065 14.4681L8.75995 10.9991C8.83359 10.9277 8.93185 10.8873 9.03465 10.8863L11.7942 10.9001C11.813 10.9003 11.8319 10.9018 11.8505 10.9049L13.0342 9.83546H5.71941V12.1921C5.71941 12.441 5.51785 12.6425 5.26904 12.6425C5.02023 12.6425 4.81866 12.441 4.81866 12.1921V9.83546H3.2235C2.81233 9.8337 2.46148 10.1325 2.3979 10.5387L0 27.7419C0.0175928 28.9023 0.962576 29.8339 2.1232 29.8352H10.3875L12.3778 15.5566L12.3793 15.5491Z"
                  fill="#C7B8A7"
                />
                <path
                  d="M9.19155 11.6589L5.83635 15.0141C5.7318 15.1184 5.7318 15.2881 5.83635 15.3926L7.6851 17.2416C7.78965 17.3459 7.9593 17.3459 8.06385 17.2416L11.4188 13.8864L11.4077 11.67L9.19155 11.6589ZM10.7073 13.8412C10.3012 14.2473 9.64293 14.2473 9.23679 13.8412C8.83065 13.4351 8.83065 12.7768 9.23679 12.3707C9.64293 11.9645 10.3012 11.9645 10.7073 12.3707C10.9038 12.5647 11.0147 12.8296 11.0147 13.1061C11.0147 13.3823 10.9038 13.6472 10.7073 13.8412Z"
                  fill="#C7B8A7"
                />
                <path
                  d="M26.5316 29.858L23.3362 26.1585C23.2576 26.0675 23.2186 25.9489 23.2281 25.829L23.4425 23.0878C23.4433 23.0762 23.4453 23.0652 23.4468 23.0541L22.4111 21.7236C21.3847 23.1253 19.5734 23.7078 17.9224 23.1677C16.2712 22.6274 15.1548 21.0868 15.1556 19.3493V17.2842C15.1556 17.0356 15.3571 16.8338 15.606 16.8338C15.8548 16.8338 16.0563 17.0356 16.0563 17.2842V19.3491C16.0563 21.0704 17.4517 22.4658 19.1728 22.4658C20.8941 22.4658 22.2894 21.0704 22.2894 19.3491V17.2842C22.2894 17.0356 22.491 16.8338 22.7398 16.8338C22.9886 16.8338 23.1902 17.0356 23.1902 17.2842V19.3491C23.1907 19.8713 23.0884 20.3888 22.8896 20.8719L24.3129 22.6998L26.0704 22.8194L25.0761 15.6853C25.0279 15.3804 24.7645 15.156 24.4556 15.1572H13.8902C13.5813 15.156 13.3179 15.3804 13.2696 15.6853L11.2593 30.1073C11.2764 31.0387 12.0359 31.7852 12.9675 31.7859H25.3785C26.2732 31.7849 27.0159 31.0945 27.082 30.2023C26.8678 30.146 26.6758 30.0259 26.5316 29.858Z"
                  fill="#C7B8A7"
                />
                <path
                  d="M25.5677 24.8626C25.4732 24.8626 25.3918 24.9284 25.3717 25.0209C25.3516 25.1131 25.3986 25.2069 25.4845 25.2461C25.5705 25.2853 25.6723 25.2594 25.7288 25.184C25.7856 25.1083 25.7818 25.0035 25.72 24.9319C25.6818 24.8877 25.6263 24.8623 25.5677 24.8626Z"
                  fill="#C7B8A7"
                />
                <path
                  d="M29.4897 27.3033L26.4172 23.7458L24.3061 23.6021L24.141 25.7117L27.2134 29.2694C27.2861 29.3534 27.413 29.3627 27.4969 29.2901L29.4691 27.5871C29.553 27.5144 29.5623 27.3875 29.4897 27.3033ZM26.6671 25.1437C26.6251 25.719 26.1466 26.1643 25.57 26.1651C25.5426 26.1651 25.5152 26.1643 25.4878 26.1623C24.8809 26.1178 24.425 25.5898 24.4695 24.9831C24.514 24.3761 25.0417 23.9202 25.6487 23.9647C26.2554 24.0089 26.7115 24.537 26.6671 25.1437Z"
                  fill="#C7B8A7"
                />
              </g>
              <circle cx="28.3077" cy="3.69231" r="3.69231" fill="#C7B8A7" />
              <defs>
                <rect
                  width="29.5385"
                  height="29.5385"
                  fill="white"
                  transform="translate(0 2.46143)"
                />
              </defs>
            </svg>
          </div>
          <div className="card-lks__material">
            <Trans i18nKey="CardProduct.material">
              Материал: 
            </Trans> шерсть
          </div> 
          <div className="card-lks__color">
            <Trans i18nKey="CardProduct.color">
              Цвет: 
            </Trans>
            {props.colors.map((item, i) => <div key={i} className="card-lks__color-circle" style={{backgroundColor: item.color}}></div>)}
          </div>
          <div className="card-lks__price">{props.price}</div>
          <div className="card-lks__btn product-card__btn">
            <button className="btn btn_vinous btn_center " onClick={handleShow}>
              <div className="btn__text btn__text_center">
                <Trans i18nKey="CardProduct.buttonQuickOrderText">
                  Быстрый заказ
                </Trans>
              </div>
            </button>
          </div>
        </Card.Body>
      </Card>
      <div className="product-card__modal-quick-purchase">
        <Modal show={showModalQuickPurchase} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Trans i18nKey="CardProduct.modalTitle">
                Быстрая покупка
              </Trans>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="product-card__modal-quick-purchase-body">
              <img
                className="product-card__modal-quick-purchase-img"
                src={"http://dev.backend.littleknitsstory.com" + props.image_preview}
                alt="cardImgProduct"
              />
              <div className="product-card__modal-quick-purchase-descr">
                <div className="product-card__modal-quick-purchase-title">
                  {props.title}
                </div>

                <div className="product-card__modal-quick-purchase-part-number">
                  <Trans i18nKey="CardProduct.partNumber">
                    Артикул:
                  </Trans> {props.code}
                </div>
                <div className="product-card__modal-quick-purchase-color">
                  <Trans i18nKey="CardProduct.color">
                    Цвет: 
                  </Trans>
                  {props.colors?.map((item, i) => <div key={i} className="card-lks__color-circle" style={{backgroundColor: item.color}}></div>)}
                </div>
                <div className="product-card__modal-quick-purchase-wrapper">
                  <div className="product-card__modal-quick-purchase-wrapper-price">
                    {props.price}
                  </div>
                  <div className="product-card__modal-quick-purchase-wrapper-discount">
                    <Trans i18nKey="CardProduct.sale">
                      Скидка
                    </Trans> {props.sale}
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
                <div className="btn__text btn__text_center">
                  <Trans i18nKey="CardProduct.buttonSendText">
                    Отправить
                  </Trans>
                </div>
              </button>
            </Form>
            <div className="product-card__modal-quick-purchase-policy">
              <Trans i18nKey="CardProduct.purchasePolice">
                Нажимая «Отправить», вы даете согласие на обработку персональных
                данных
              </Trans>
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
              <Trans i18nKey="CardProduct.thanks">
                Спасибо
              </Trans>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-modal-thanks__text">
              <Trans i18nKey="CardProduct.thanksText1">
                Ваша заявка принята.
              </Trans>
              <br /> 
              <Trans i18nKey="CardProduct.thanksText2">
                В Ближайшее время с вами свяжется наш менеджер
              </Trans>
            </div>
            <Link to={`/`}>
              <button className="btn btn_vinous btn_center card-modal-thanks__btn">
                <div className="btn__text btn__text_center">
                  <Trans i18nKey="CardProduct.backHome">
                    Вернуться на главную
                  </Trans>
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

export default CardProduct;
