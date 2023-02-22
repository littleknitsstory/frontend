import { useCallback, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import arrowRight from "../icons/arrow-right.svg";
import { useGetProductsQuery } from "../services";
import CardProduct from "./CardProduct";
import Filters from "./Filters";
import Spinner from "./Spinner";

const Products = () => {
  const { t } = useTranslation();

  const [limit, setLimit] = useState<number>(4);

  const { data, isLoading } = useGetProductsQuery({ limit, offset: 0 });
  const isLastPage = data?.count ? limit >= data.count : true;

  const handleSeeMore = useCallback((): void => {
    setLimit((prev) => prev + 4);
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
              {isLoading && <Spinner />}
              {data &&
                data.results.map((item) => {
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
            <Col className="text-end">
              <Link to="/shop" onClick={handleSeeMore}>
                {t("seeMore")}
                <img src={arrowRight} alt="arrowRight" />
              </Link>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default Products;
