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
import { IProduct } from "../app/models";

const Products = () => {
  const { t, i18n } = useTranslation();
  const [limit, setLimit] = useState<number>(4);
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery({lang: i18n.language, limit})

  const [isAllShown, setAllShown] = useState<boolean>(false)
  const [renderProducts, setRenderProducts] = useState<IProduct[]>([]) /* Which array of products render */
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
  const [filteredColors, setFilteredColors] = useState<IProduct[]>([])
  const [filteredCategories, setFilteredCategories] = useState<IProduct[]>([])
  const [hasOverlap, setHasOverlap] = useState<boolean>(true)

  useEffect((): void => {
    if (products) setRenderProducts(products.results)
  }, [products])

  useEffect(() => {
    const colorLength: number = filteredColors.length
    const categoryLength: number = filteredCategories.length

    // check if only one filter active
    if (colorLength > 0 && categoryLength === 0) {
      setFilteredProducts(filteredColors)
      setHasOverlap(true)
      setAllShown(true)
    } 
    if (categoryLength > 0 && colorLength === 0) {
      setFilteredProducts(filteredCategories)
      setHasOverlap(true)
      setAllShown(true)
    } 

    // if both filters are active (find overlap)
    if (categoryLength > 0 && colorLength > 0) {
      const isSameProduct = (a: IProduct, b: IProduct): boolean => a.id === b.id
        
      const compareProducts = (a: IProduct[], b: IProduct[]) => 
        a.filter(firstArray =>
          b.some(secondArray => 
            isSameProduct(firstArray, secondArray)));
        
      const filteredProducts = compareProducts(filteredCategories, filteredColors)
        // check if filters has overlap
        if (filteredProducts.length === 0) {
          setHasOverlap(false)
        } else {
          setHasOverlap(true)
          setAllShown(true)
          setRenderProducts(filteredProducts)
        }
    } 
    
    // if both filters are inactive
    if (categoryLength === 0 && colorLength === 0) {
      if (products) {
        setRenderProducts(products?.results)
        setAllShown(limit >= products?.count)
      }
    }
  }, [filteredCategories, filteredColors])

  // Select which array of products render
  useEffect(() => {
    if(filteredProducts.length > 0) {
      setRenderProducts(filteredProducts)
    } else if (products) {
      setRenderProducts(products.results)
    } 
  }, [filteredProducts, products])

  useEffect(() => {
    if (products) setAllShown(limit >= products?.count)
  }, [products, limit])

  const clearFilters = () => {
    if (products) {
      setFilteredCategories([])
      setFilteredColors([])
      setFilteredProducts([])
      setRenderProducts(products?.results)
      setAllShown(limit >= products?.count)
    }
  }
  
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
            <Filters 
              // filterCategories={filterCategories} 
              // filterColors={filterColors}
              clearFilters={clearFilters}
              setFilteredCategories={setFilteredCategories} 
              setFilteredColors={setFilteredColors}
            />
          </Col>
          <Col>
            <Row xs={1} md={1} lg={2} xl={2} xxl={3}>
              {hasOverlap && renderProducts.map((item) => {
                return (
                  <Col key={item.id}>
                    <CardProduct productSlug={item.slug} />
                  </Col>
                );
              })}
              {!hasOverlap &&
                <div>Не найдено товаров по выбранным фильтрам.</div>
              }
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
