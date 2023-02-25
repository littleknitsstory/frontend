import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import arrowRight from "../icons/arrow-right.svg";
import CardProduct from "./CardProduct";
import Filters from "./Filters";
import { useGetProductsQuery } from "../features/api/apiSlice";
import i18next from "../i18n"
import Spinner from "./Spinner";

const Products = () => {
  const {
    data: products,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetProductsQuery({lang: i18next.language}) /* optional args: {limit: num, offset: num} */

  const { t } = useTranslation();
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
