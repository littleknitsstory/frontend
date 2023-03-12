import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useGetProductsQuery } from "../../components/features/api/apiSlice";
// components
import Filters from "../../components/products/Filters";
import CardProduct from "../../components/products/CardProduct";
import Spinner from "../../components/utils/Spinner";
import PageError from "../PageError";
// assets
import arrowRight from "../../assets/icons/arrow-right.svg";
import { IProduct } from "../../app/types";
import { Link } from "react-router-dom";

const Products = () => {
  const { t, i18n } = useTranslation();
  const [limit, setLimit] = useState<number>(4);
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetProductsQuery({ lang: i18n.language, limit });

  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [renderProducts, setRenderProducts] = useState<IProduct[]>(
    [],
  ); /* Which array of products render */
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [filteredColors, setFilteredColors] = useState<IProduct[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<IProduct[]>([]);
  const [hasOverlap, setHasOverlap] = useState<boolean>(true);

  useEffect((): void => {
    if (products) setRenderProducts(products.results);
  }, [products]);

  useEffect(() => {
    const colorLength: number = filteredColors.length;
    const categoryLength: number = filteredCategories.length;

    // check if only one filter active
    if (colorLength > 0 && categoryLength === 0) {
      setFilteredProducts(filteredColors);
      setHasOverlap(true);
      setIsLastPage(true);
    }
    if (categoryLength > 0 && colorLength === 0) {
      setFilteredProducts(filteredCategories);
      setHasOverlap(true);
      setIsLastPage(true);
    }

    // if both filters are active (find overlap)
    if (categoryLength > 0 && colorLength > 0) {
      const isSameProduct = (a: IProduct, b: IProduct): boolean => a.id === b.id;

      const compareProducts = (a: IProduct[], b: IProduct[]) =>
        a.filter((firstArray) => b.some((secondArray) => isSameProduct(firstArray, secondArray)));

      const comparedProducts = compareProducts(filteredCategories, filteredColors);
      // check if filters has overlap
      if (comparedProducts.length === 0) {
        setHasOverlap(false);
      } else {
        setHasOverlap(true);
        setIsLastPage(true);
        setFilteredProducts(comparedProducts);
      }
    }

    // if both filters are inactive
    if (categoryLength === 0 && colorLength === 0) {
      if (products) {
        setRenderProducts(products?.results);
        setIsLastPage(limit >= products?.count);
        setFilteredProducts([]);
      }
    }
  }, [filteredCategories, filteredColors]);

  // Select which array of products render
  useEffect(() => {
    if (filteredProducts.length > 0) {
      setRenderProducts(filteredProducts);
    } else if (products) {
      setRenderProducts(products.results);
    }
  }, [filteredProducts, products]);

  useEffect(() => {
    if (products) {
      if (limit !== 3 && limit >= products?.count) {
        setIsLastPage(true);
      }
    }
  }, [limit]);

  const clearFilters = () => {
    if (products) {
      setFilteredCategories([]);
      setFilteredColors([]);
      setFilteredProducts([]);
      setHasOverlap(true);
      setRenderProducts(products?.results);
      setIsLastPage(limit >= products?.count);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <Container>
      <div className="products">
        <Row>
          <Col>
            <div>
              <Link to="/">Main</Link>
              <Link to="/shop/">/Shop</Link>
            </div>
          </Col>
        </Row>
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
            <Filters
              clearFilters={clearFilters}
              setFilteredCategories={setFilteredCategories}
              setFilteredColors={setFilteredColors}
            />
          </Col>
          <Col>
            <Row xs={1} md={1} lg={2} xl={2} xxl={3}>
              {hasOverlap &&
                renderProducts.map((product) => {
                  return (
                    <Col key={product.id}>
                      <CardProduct productSlug={product.slug} />
                    </Col>
                  );
                })}
              {!hasOverlap && <div>Не найдено товаров по выбранным фильтрам.</div>}
            </Row>
          </Col>
        </Row>
        {isFetching ? (
          <Spinner />
        ) : (
          !isLastPage && (
            <button className="btn btn_border" onClick={() => setLimit((prev) => prev + 4)}>
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
