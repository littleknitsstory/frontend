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
  } = useGetProductsQuery({lang: i18n.language, limit}) /* optional args: {limit: num, offset: num} */

  const [isAllShown, setAllShown] = useState<boolean>(false)
  const [renderProducts, setRenderProducts] = useState<IProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
  const [filteredColors, setFilteredColors] = useState<IProduct[]>([])
  const [filteredCategories, setFilteredCategories] = useState<IProduct[]>([])
  const [hasOverlap, setHasOverlap] = useState<boolean>(false)
  // const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (products) {
      setRenderProducts(products.results)
      setFilteredColors(products.results)
      setFilteredCategories(products.results)
    }
  }, [products])
  
  // Filtering products by category
  const filterCategories = (selectedCategory: string): void => {
    if (products && selectedCategory) {
      if (selectedCategory === "clear") {
        setFilteredCategories(products.results)
      } else {
        const filtered = products?.results.filter(product => 
          product.categories.some(category => category.title === selectedCategory)
        )
        setFilteredCategories(filtered)
        setAllShown(true)
      }
    } 
  }

  // Filtering products by color
  const filterColors = (selectedColor: string): void => {
    if (products && selectedColor) {
      if (selectedColor === "clear") {
        setFilteredColors(products.results)
      } else {
        const filtered = products.results.filter(product => 
          product.colors.some(color => color.color === selectedColor)
          )
          setFilteredColors(filtered)
          setAllShown(true)
      }
    } 
  }

  // Compare two filtered arrays
  useEffect(() => {
    const isSameProduct = (a: IProduct, b: IProduct): boolean => a.id === b.id
    
    const compareProducts = (a: IProduct[], b: IProduct[]) => 
      a.filter(firstArray =>
        b.some(secondArray => 
          isSameProduct(firstArray, secondArray)));

    const filteredProducts = compareProducts(filteredCategories, filteredColors)
    setFilteredProducts(filteredProducts)
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
    if (products) {
      setAllShown(limit >= products?.count)
    }
    
  }, [products, limit])

  const clearFilters = () => {
    if (products) {
      setFilteredCategories(products?.results)
      setFilteredColors(products?.results)
      setFilteredProducts(products?.results)
      setRenderProducts(products?.results)
      setAllShown(limit >= products?.count)
    }
  }
  
  // If any products with selected filters
  useEffect(() => {
    const noOverlap = 
      filteredProducts.length === 0 && 
        (filteredCategories.length > 0 || filteredColors.length > 0)
    setHasOverlap(!noOverlap)
  }, [filteredProducts, filteredCategories, filteredColors])
  
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
              filterCategories={filterCategories} 
              filterColors={filterColors}
              clearFilters={clearFilters} 
            />
          </Col>
          <Col>
            <Row xs={1} md={1} lg={2} xl={2} xxl={3}>
              {hasOverlap && renderProducts.slice(0, limit).map((item) => {
                return (
                  <Col key={item.id}>
                    <CardProduct product={item} />
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
