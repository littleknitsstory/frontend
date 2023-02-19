import React, { useCallback, useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getProducts } from "../api";
import { IProduct, IProductsResponse } from "../api/models";
import arrowRight from "../icons/arrow-right.svg";
import CardProduct from "./CardProduct";
import Filters from "./Filters";
import { useGet } from "./Hooks/useFetch";
import { LanguageContext } from "../App";
import {baseURL} from "./Hooks/useFetch"
import Page404 from "./Page404";
import Spinner from "./Spinner";

const Products = () => {
  const { t } = useTranslation()
  const { language } = useContext(LanguageContext)  

  const [products, setProducts] = useState<IProduct[]>();
  const [limit, setLimit] = useState<number>(4);
  const [count, setCount] = useState<number>(0);
  const isLastPage = limit >= count;

  const { data, loading, error } = useGet<IProductsResponse>({
    url: "PRODUCTS",
    method: "GET",
    lang: language,
    query: {
      limit: limit,
      offset: 0
    }
  })
  useEffect(() => {
    if (data) {
      const updatedData = {
        ...data,
        results: data?.results.map((item) => ({
          ...item,
          image_preview: `${baseURL}${item.image_preview}`,
        })),
      }
      setProducts(updatedData.results)
      setCount(data.count)

    }
  }, [data]);

  const handleSeeMore = useCallback((): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setLimit((prev) => prev + 4);
  }, []);

  if (error) {
    console.log(error)
    return (
      <Page404 error={error}/>
    )
  }

  return (
    <Container>
      {loading && <Spinner />}
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
              {products?.map((item) => {
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
          // <Row>
          //   <Col>
          //     <Link to="/shop" onClick={handleSeeMore}>
          //       {t("seeMore")}
          //       <img src={arrowRight} alt="arrowRight" />
          //     </Link>
          //   </Col>
          // </Row>
          <button className="btn btn_border" onClick={handleSeeMore}>
          <div className="btn__text">{t("seeMore")}</div>
          <div className="btn__icon">
            <img src={arrowRight} alt="arrowWhite" />
          </div>
        </button>
        )}
      </div>
    </Container>
  );
};

export default Products;
