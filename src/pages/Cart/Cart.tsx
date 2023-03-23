import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import CardProductCart from "../../components/cart/CardProductCart";
import { convertToCurrency } from "../../utils/convertPrice";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const { products: cartProducts, totalPrice } = useAppSelector((state) => state.cart);

  const totalAmount = cartProducts.reduce((acc, current) => acc + current.amount, 0)

  if (cartProducts.length === 0) {
    return (
      <div className="cart--empty">
        <p> {t("Cart.empty")} </p>
        <Link to="/products/">{t("Cart.buttonText")} 🛒</Link>
      </div>
    );
  }

  return (
    <section className="cart">
      <Container>
        <Row xs={1} md={2} lg={1} xl={1} xxl={1}>
          {cartProducts.map((item) => {
            return (
              <Col key={item.id}>
                <CardProductCart productSlug={item.slug} />
              </Col>
            );
          })}
        </Row>

        <h4 className="cart__total-price">{t("Cart.total")} {totalAmount} {t("Cart.amount")} — {convertToCurrency(totalPrice, i18n.language)  }</h4>
        <Row>
          <h4 className="cart__title">{t("Cart.bonus")}</h4>
          
          <Col xs={12} md={5} lg={4} xl={4} xxl={3} className="cart__loyalty">
            <p className="cart__text">{t("Cart.bonusAvailable")}</p>
            <input
              className="cart__input form-control"
              type="number"
              placeholder={"0"}
              min={0}
              name="bonuses"
              aria-label="email"
            />
            <button className="btn btn--primary">
              {t("Cart.activate")} 
            </button>
          </Col>
          <Col className="cart__loyalty-description">
            <p className="cart__text--small">{t("Cart.bonusDescription")}</p>
            <p className="cart__text--small">{t("Cart.bonusDescription2")}</p>
          </Col>
            <p className="cart__text">{t("Cart.orderBonuses")}</p>
            <p className="cart__text--small">{t("Cart.bonusDescription3")}</p>
        </Row>

        <Col xs={12} md={9} xl={6}> 
          <h4 className="cart__title">{t("Cart.paymentMethods")}</h4>
          <p className="cart__text">{t("Cart.warning")}</p>

          <div className="cart__radio-wrapper">
            <div className="cart__radio-item">
              <input 
                className="cart__radio-input" 
                type="radio" 
                name="paymentMethods" 
                id="cash" 
                value="cash" 
              />
              <label htmlFor="cash">{t("Cart.cash")}</label>
            </div>
            <div className="cart__radio-item">
              <input 
                className="cart__radio-input"
                type="radio" 
                name="paymentMethods" 
                id="card" 
                value="card" 
              />
              <label htmlFor="card">{t("Cart.card")}</label>
            </div>
          </div>

          <Link to="/cart/ordering" className="btn btn--primary">{t("Cart.ordering")}</Link>
        </Col>
      </Container>
    </section>
  );
};

export default Cart;