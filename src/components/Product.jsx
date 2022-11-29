import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLksService from "../assests/api";

const Product = () => {
  const [product, setProduct] = useState([]);
  const { error, getProduct, _apiPictures, loaded } = useLksService();

  const { slug } = useParams();

  useEffect(() => {
    getProduct(slug).then((data) => setProduct(data));
  }, [slug]);

  return (
    <div className="lks-container">
      {error ? (
        <h3>Что-то пошло не так, данные не получены</h3>
      ) : loaded ? (
        <ul>
          <li>
            {product.title}
            {product.price}
            {product.categories.map((cat) => (
              <div>{cat.title}</div>
            ))}
            <img src={`${_apiPictures}${product.image_preview}`}></img>
            <div
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            ></div>
          </li>
        </ul>
      ) : (
        <h3>Ждем загрузку данных</h3>
      )}
    </div>
  );
};

export default Product;
