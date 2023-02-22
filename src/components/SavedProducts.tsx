import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import arrowRight from "../icons/arrow-right.svg";
import { IProduct } from "../store/productSlice";
import CardProduct from "./CardProduct";

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
