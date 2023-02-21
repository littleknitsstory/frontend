import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardProduct from "./CardProduct";
import arrowRight from "../icons/arrow-right.svg";
import { IProduct } from "../api/models";
import { useTranslation } from "react-i18next";

const SavedProducts = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<IProduct[]>([]);

  return (
    <section className="saved-products">
      <Container>
        <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
          {products.map((item) => {
            return (
              <Col key={item.id}>
                <CardProduct product={item} />
              </Col>
            );
          })}
        </Row>
        <button className="btn btn_border">
          <div className="btn__text">{t("Footer.cart")}</div>
          <div className="btn__icon">
            <img src={arrowRight} alt="arrowWhite" />
          </div>
        </button>
      </Container>
    </section>
  );
};

export default SavedProducts;
