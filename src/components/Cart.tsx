import { Container, Row, Col } from "react-bootstrap";
import CardProductCart from "./CardProductCart";
import { useAppSelector } from "../app/hooks";

const Cart = () => {
  const cartProducts = useAppSelector(state => state.products.cart)
  const array: {id: number}[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <section className="saved-products">
      <Container>
        <Row xs={1} md={2} lg={1} xl={1} xxl={1}>
          {cartProducts.map((item) => {
            return (
              <Col key={item.id}>
                <CardProductCart product={item}/>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
