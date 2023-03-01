import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import arrowRight from "../icons/arrow-right.svg";
import { useGetProductsQuery } from "../store/apiSlice";

import CardProduct from "./CardProduct";
import Filters from "./Filters";
import PageError from "./PageError";
import Spinner from "./Spinner";

const Products = () => {
  const { t } = useTranslation();
  const [limit, setLimit] = useState<number>(3);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const {
    data: products,
    isLoading,
    isError,
    isFetching,
    error,
  } = useGetProductsQuery({ limit });

  useEffect(() => {
    if (products) {
      if (limit !== 3 && limit >= products?.count) {
        setIsLastPage(true);
      }
    }
  }, [limit]);

  const handleSeeMore = useCallback((): void => {
    setLimit((prev) => prev + 3);
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
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
              {products?.results.map((item: any) => {
                return (
                  <Col key={item.id}>
                    <CardProduct product={item} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        {isFetching ? (
          <Spinner />
        ) : (
          !isLastPage && (
            <button className="btn btn_border" onClick={handleSeeMore}>
              <div className="btn__text">{t("seeMore")}</div>
              <div className="btn__icon">
                <img src={arrowRight} alt="arrowWhite" />
              </div>
            </button>
          )
        )}
      </div>
    </Container>
  );
};

export default Products;
