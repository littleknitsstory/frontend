import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardProduct from "./CardProduct";
import arrowRight from "../icons/arrow-right.svg";

const SavedProducts = () => {
  const [savedProducts, setSavedProducts] = useState([])
  const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <section className="saved-products">
      <Container>
        <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
          {savedProducts.length > 0 && 
            savedProducts.map(product => {
              return (
                <Col key={product.id}>
                  <CardProduct { ...product }/>
                </Col>
              );
            })
          }
        </Row>
        <p>У вас нет сохраненных товаров</p>
        <button className="btn btn_border">
          <div className="btn__text">Перейти в корзину</div>
          <div className="btn__icon">
            <img src={arrowRight} alt="arrowWhite" />
          </div>
        </button>
      </Container>
    </section>
  );
};

export default SavedProducts;
