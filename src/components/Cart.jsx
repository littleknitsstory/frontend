import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardProductCart from "./CardProductCart";

const Cart = () => {
  const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <section className="saved-products">
      <Container>
        <Row xs={1} md={2} lg={1} xl={1} xxl={1}>
          {array.map((item) => {
            return (
              <Col key={item.id}>
                <CardProductCart />
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
