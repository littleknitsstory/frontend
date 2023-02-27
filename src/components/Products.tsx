import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useGetProductsQuery } from "../features/api/apiSlice";
// components
import Filters from "./Filters";
import CardProduct from "./CardProduct";
import Spinner from "./Spinner";
import Page404 from "./Page404";
// assets
import arrowRight from "../assets/icons/arrow-right.svg";

const Products = () => {
  const { t, i18n } = useTranslation();
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery({lang: i18n.language}) /* optional args: {limit: num, offset: num} */

  const [limit, setLimit] = useState<number>(4);
  const [isAllShown, setAllShown] = useState<boolean>(false)
  // const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (products) {
      setAllShown(limit > products.results.length)
    }
  },[limit, products])
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <Page404 />
  }

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
              {products?.results.slice(0, limit).map((item) => {
                return (
                  <Col key={item.id}>
                    <CardProduct product={item} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        {!isAllShown && (
          <button 
            className="btn btn_border btn__text" 
            onClick={() => setLimit(prev => prev + 4)}
          >
            {t("seeMore")}
            <img src={arrowRight} alt="arrowWhite" />
          </button>
        )}
      </div>
    </Container>
  );
};

export default Products;
