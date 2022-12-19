import React from "react";
import { useEffect, useState } from "react";
import useLksService from "../assests/api";
import Spinner from "./Spinner";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import { Container } from "react-bootstrap";

const Products = ({ limit, categoriesVisible, col, colMd }) => {
  const [products, setProducts] = useState([]);
  const { error, getProducts, loaded } = useLksService();
  const [offset, setOffset] = useState(-6);
  const [newProductLoading, setNewProductLoading] = useState(true);
  const [productEnded, setProductEnded] = useState(false);
  const [category, setCategory] = useState("Toys");

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewProductLoading(false) : setNewProductLoading(true);
    getProducts(limit, offset).then((data) => onProductsLoaded(data.results));
  };

  const onProductsLoaded = (newProductList) => {
    let ended = false;
    if (newProductList.length < 6) {
      ended = true;
    }
    setProducts([...products, ...newProductList]);
    setOffset((offset) => offset + 6);
    setNewProductLoading(false);
    setProductEnded(ended);
  };

  return (
    <Container>
      <div className="lks-container">
        <div className="products products-top">
          {error || !loaded ? (
            <Spinner />
          ) : (
            <div className="row">
              <div className={categoriesVisible}>
                <Categories />
              </div>

              <div className="col">
                <div className="row">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      slug={product.slug}
                      title={product.title}
                      price={product.price}
                      image_preview={product.image_preview}
                      col={col}
                    />
                  ))}
                </div>
              </div>

              <p
                className="lks-see-more"
                onClick={() => {
                  onRequest(offset);
                }}
                disabled={newProductLoading}
                style={{ display: productEnded ? "none" : "block" }}
              >
                Смотреть еще
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Products;
