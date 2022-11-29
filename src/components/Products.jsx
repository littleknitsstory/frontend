import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLksService from "../assests/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { error, getProducts, loaded } = useLksService();
  const [offset, setOffset] = useState(-4);
  const [newProductLoading, setNewProductLoading] = useState(true);
  const [productEnded, setProductEnded] = useState(false);

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewProductLoading(false) : setNewProductLoading(true);
    getProducts(offset).then((data) => onProductsLoaded(data.results));
  };

  const onProductsLoaded = (newProductList) => {
    let ended = false;
    if (newProductList.length < 4) {
      ended = true;
    }
    setProducts([...products, ...newProductList]);
    setOffset((offset) => offset + 4);
    setNewProductLoading(false);
    setProductEnded(ended);
  };

  return (
    <div className="lks-container">
      {error ? (
        <h3>Что-то пошло не так, данные не получены</h3>
      ) : newProductLoading || loaded ? (
        <div>
          <h3>Все продукты</h3>
          <button
            onClick={() => {
              onRequest(offset);
            }}
            disabled={newProductLoading}
            style={{ display: productEnded ? "none" : "block" }}
          >
            see more
          </button>
          {products.map((product) => (
            <ul key={product.id}>
              <Link to={`/products/${product.slug}`}>
                <li>
                  {product.title}
                  {product.price}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  ></div>
                </li>
              </Link>
            </ul>
          ))}
        </div>
      ) : (
        <h3>Ждем загрузку данных</h3>
      )}
    </div>
  );
};

export default Products;
