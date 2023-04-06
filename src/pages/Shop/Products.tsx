import { useCallback, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { IProduct } from "../../app/types";
import { useGetFeaturesQuery, useGetProductsQuery } from "../../components/features/api/apiSlice";
import CardProduct from "../../components/products/CardProduct";
import Filters from "../../components/products/Filters";
import Spinner from "../../components/utils/Spinner";
import PageError from "../PageError";

const INITIAL_LIMIT = 4;

const Products = () => {
  const { data: feature } = useGetFeaturesQuery();
  const { t, i18n } = useTranslation();
  const [limit, setLimit] = useState<number>(INITIAL_LIMIT);
  const observer = useRef<IntersectionObserver>();
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetProductsQuery({ lang: i18n.language, limit: 200 });

  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products?.results ?? []);
  const [shownProducts, setShownProducts] = useState<IProduct[]>([]);
  const hasMore = filteredProducts.length > shownProducts.length;

  useEffect(() => {
    setLimit(INITIAL_LIMIT);
  }, [filteredProducts]);

  useEffect(() => {
    setShownProducts(filteredProducts.slice(0, limit));
  }, [filteredProducts, limit]);

  const loaderRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setLimit((prevLimit) => prevLimit + 4);
          }
        },
        {
          rootMargin: "40px",
        },
      );
      observer.current.observe(node);
    },
    [hasMore, isFetching],
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  if (!feature?.shop) {
    return <PageError errorStatus={404} />;
  }

  return (
    <Container>
      {feature?.shop && (
        <div className="products">
          <Row>
            <Col sm={12} md={6} lg={4} xl={4} xxl={3}>
              <Filters
                products={products?.results ?? []}
                setFilteredProducts={setFilteredProducts}
              />
            </Col>
            <Col>
              <Row xs={1} md={1} lg={2} xl={2} xxl={3}>
                {shownProducts.map((product, index) => {
                  return (
                    <Col key={product.id}>
                      <CardProduct productSlug={product.slug} />
                    </Col>
                  );
                })}
                {!shownProducts.length && (
                  <p className="filters__no-overlap">{t("Filter.noMatch")}</p>
                )}
              </Row>
            </Col>
          </Row>
          <div ref={loaderRef} />
          {isFetching && <Spinner />}
        </div>
      )}
    </Container>
  );
};

export default Products;
