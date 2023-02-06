import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import CardProduct from "./CardProduct";
import Filters from "./Filters";

import arrowRight from "../icons/arrow-right.svg";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getCategoriesThunk, getProductsThunk, selectCategories, selectProducts} from "../store/apiTestSlice";

const Products = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const categories = useAppSelector(selectCategories)

  useEffect(() => {
    dispatch(getProductsThunk())
    dispatch(getCategoriesThunk())
  }, [])
  console.log(categories)
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
            <Filters/>
          </Col>
          <Col>
            <Row xs={1} md={1} lg={2} xl={2} xxl={3}>
              {products.map((i) => <Col key={i.id}>
                  <CardProduct title={i.title}
                               code={i.code}
                               price={i.price}
                               sale={i.sale}
                               imageAlt={i.image_alt}/>
                </Col>
              )}
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
              Смотреть еще <img src={arrowRight} alt="arrowRight"/>
            </Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Products;
