import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import CardProductCart from "../../components/cart/CardProductCart";
import { convertToCurrency } from "../../utils/convertPrice";
import arrowRight from "../../assets/icons/arrow-right.svg";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const { products: cartProducts, totalPrice } = useAppSelector((state) => state.cart);

  const totalAmount = cartProducts.reduce((acc, current) => acc + current.amount, 0)

  if (cartProducts.length === 0) {
    return (
      <div className="cart--empty">
        <p> {t("Cart.empty")} </p>
        <Link to="/shop/">{t("Cart.buttonText")} 🛒</Link>
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

        <h4 className="cart__total-price">Итого: {totalAmount} шт. — {convertToCurrency(totalPrice, i18n.language)  }</h4>
        <Row>
          <h4 className="cart__title">Программа лояльности</h4>
          
          <Col xs={12} md={5} lg={4} xl={4} xxl={3} className="cart__loyalty">
            <p className="cart__text">Доступно бонусов: 12555 ₽</p>
            <input
              className="cart__input form-control"
              type="number"
              placeholder={"0"}
              min={0}
              name="bonuses"
              aria-label="email"
            />
            <button className="btn btn_border btn__link">Активировать <img src={arrowRight} alt="arrowWhite" /></button>
          </Col>
          <Col className="cart__loyalty-description">
            <p className="cart__text--small">Активные бонусы на данный момент. Их уже можно использовать.</p>
            <p className="cart__text--small">Списание бонусов возможно только при выборе способа доставки — "Курьером".</p>
          </Col>
            <p className="cart__text">Бонусы за заказ: 251 ₽</p>
            <p className="cart__text--small">Будет начислено бонусов за этот заказ. Эти бонусы станут доступны только после оплаты заказа. Их можно будет использовать при следующих покупках.</p>
        </Row>

        <Col xs={12} md={9} xl={6}> 
          <h4 className="cart__title">Способы оплаты</h4>
          <p className="cart__text">Важно! Просим учесть, что скидка при оформлении заказа в Корзине не проставляется. После принятия заказа в работу, менеджер интернет-магазина пересчитает его с учётом скидки и свяжется с Вами.</p>

          <div className="cart__radio-wrapper">
            <div className="cart__radio-item">
              <input 
                className="cart__radio-input" 
                type="radio" 
                name="paymentMethods" 
                id="cash" 
                value="cash" 
              />
              <label htmlFor="cash">Наличными</label>
            </div>
            <div className="cart__radio-item">
              <input 
                className="cart__radio-input"
                type="radio" 
                name="paymentMethods" 
                id="card" 
                value="card" 
              />
              <label htmlFor="card">Карта</label>
            </div>
          </div>

          <Link to="/cart/ordering" className="btn btn_vinous">Продолжить оформление заказа</Link>
        </Col>
      </Container>
    </section>
  );
};

export default Cart;