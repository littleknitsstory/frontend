import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLksService from "../assests/api";

const Products = ({ category }) => {
  const [products, setProducts] = useState([]);
  const { error, getProducts } = useLksService();

  useEffect(() => {
    getProducts().then((data) => setProducts(data.results));
  }, []);

  return (
    <div className="lks-container">
      {error ? (
        <h3>Что-то пошло не так, данные не получены</h3>
      ) : (
        <div>
          <h3>Все продукты</h3>
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
      )}
    </div>
  );
};

export default Products;
