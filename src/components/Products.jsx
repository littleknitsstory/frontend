import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getProducts } from "../api";
import arrowRight from "../icons/arrow-right.svg";
import CardProduct from "./CardProduct";
import Filters from "./Filters";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const isLastPage = offset + 4 >= count;

  useEffect(() => {
    getProducts(offset, 4).then(({ results, count }) => {
      setProducts(results);
      setCount(count);
    });
  }, [offset]);

  const handleSeeMore = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setOffset((prev) => prev + 4);
  }, []);

  return (
    <Container>
      <div className="products">
        <Row>
          <Col
            xs={{
              span: 12,
              offset: 0,
            }}
            sm={{
              span: 8,
              offset: 3,
            }}
            md={{
              span: 6,
              offset: 0,
            }}
            lg={{
              span: 4,
              offset: 0,
            }}
            xl={{
              span: 4,
              offset: 0,
            }}
            xxl={{
              span: 3,
              offset: 0,
            }}
          >
            <Filters />
          </Col>
          <Col>
            <Row xs={1} md={1} lg={2} xl={2} xxl={3}>
              {products.map((item) => {
                return (
                  <Col key={item.id}>
                    <CardProduct product={item} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        {!isLastPage && (
          <Row>
            <Col>
              <Link to="/shop" onClick={handleSeeMore}>
                Смотреть еще <img src={arrowRight} alt="arrowRight" />
              </Link>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default Products;
