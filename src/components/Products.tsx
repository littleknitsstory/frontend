import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { LanguageContext } from "../App";
import { getProducts } from "../api";
import { IProductsResponse } from "../api/models";
import arrowRight from "../icons/arrow-right.svg";
import { IProduct } from "../store/productSlice";
import CardProduct from "./CardProduct";
import Filters from "./Filters";

const Products = () => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [limit, setLimit] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const isLastPage = limit + 4 >= count;

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const data: IProductsResponse | void = await getProducts(0, limit);
      if (data) {
        setProducts(data.results);
        setCount(data.count);
      }
    };
    fetchProducts();
  }, [limit, language]);

  const handleSeeMore = useCallback((): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
