import { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap";
import CardProduct from "./CardProduct";
import Filters from "./Filters";

import arrowRight from "../icons/arrow-right.svg";
import { Link } from "react-router-dom";
import {  Language } from "../App";

import fetcher from "../utils/fetcher";

const Products = () => {
  const [productsData, setProductsData] = useState([])
  const language = useContext(Language)

  useEffect(() => {
    const endPoint = "/api/v1/products/"
    fetcher(endPoint, language).then(data => setProductsData(data.results))
  },[language])

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
              {productsData.map(product => {
                return (
                  <Col key={product.id}>
                    <CardProduct {...product} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link
              to="/shop"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Смотреть еще <img src={arrowRight} alt="arrowRight" />
            </Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Products;
