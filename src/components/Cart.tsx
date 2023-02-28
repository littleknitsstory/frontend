import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CardProductCart from "./CardProductCart";

const Cart = () => {
  const cartProducts = useAppSelector(state => state.products.cart)

  if (cartProducts.length === 0) {
    return (
      <Container>
        <div className="empty-cart">Нет товаров!</div>
        <Link to="/shop" className="empty-cart-link">Перейти в каталог 🛒</Link>
      </Container>
    )
  }
  return (
    <section className="saved-products">
      <Container>
        <Row xs={1} md={2} lg={1} xl={1} xxl={1}>
          {cartProducts.map((item) => {
            return (
              <Col key={item.id}>
                <CardProductCart productSlug={item.slug}/>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
