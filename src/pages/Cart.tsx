import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../app/hooks";
import CardProductCart from "../components/cart/CardProductCart";
import { convertToCurrency } from "../utils/convertPrice";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const { products, totalPrice } = useAppSelector((state) => state.cart);

  if (products.length === 0) {
    return (
      <Container>
        <div className="empty-cart"> {t("Cart.empty")} </div>
        <Link to="/shop/" className="empty-cart-link">
          {t("Cart.buttonText")} 🛒
        </Link>
      </Container>
    );
  }
  return (
    <section className="saved-products">
      <Container>
        <Row xs={1} md={2} lg={1} xl={1} xxl={1}>
          {products.map((item) => {
            return (
              <Col key={item.id}>
                <CardProductCart productSlug={item.slug} />
              </Col>
            );
          })}
        </Row>
        <h2>Total price: {convertToCurrency(totalPrice, i18n.language)  }</h2>
      </Container>
    </section>
  );
};

export default Cart;