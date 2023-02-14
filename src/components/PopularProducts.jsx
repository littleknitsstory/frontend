import React from "react";
import { Row, Col } from "react-bootstrap";
import MiniCardProduct from "./MiniCardProduct";
import { Trans } from "react-i18next";

const PopularProducts = () => {
  return (
    <section className="popular-products">
      <h3 className="title">
        <Trans i18nKey="popular">
          Популярное
        </Trans>
      </h3>
      <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
        {[1, 2, 3, 4].map((item) => {
          return (
            <Col key={item}>
              <MiniCardProduct />
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default PopularProducts;
