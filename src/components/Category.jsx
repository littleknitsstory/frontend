import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useLksService from "../assests/api";
import Spinner from "./Spinner";

const Category = () => {
  const [category, setCategory] = useState([]);
  const { error, getCategory, loaded } = useLksService();

  const { slug } = useParams();

  useEffect(() => {
    getCategory(slug).then((data) => setCategory(data.products));
  }, [slug]);

  return (
    <div className="lks-container">
      {error || !loaded ? (
        <Spinner />
      ) : (
        category.map((product) => (
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
        ))
      )}
    </div>
  );
};

export default Category;
