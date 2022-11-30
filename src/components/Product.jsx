import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLksService from "../assests/api";
import Spinner from "./Spinner";

const Product = () => {
  const [product, setProduct] = useState([]);
  const { error, getProduct, _apiPictures, loaded } = useLksService();

  const { slug } = useParams();

  useEffect(() => {
    getProduct(slug).then((data) => setProduct(data));
  }, [slug]);

  return (
    <div className="lks-container">
      {error || !loaded ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
};

export default Product;
