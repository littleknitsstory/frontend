import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useLksService from "../assests/api";

const Category = () => {
  const [category, setCategory] = useState([]);
  const { error, getCategory, _apiPictures } = useLksService();

  const { slug } = useParams();

  useEffect(() => {
    getCategory(slug).then((data) => setCategory(data.products));
  }, [slug]);

  return (
    <div className="lks-container">
      {error ? (
        <h3>Что-то пошло не так, данные не получены</h3>
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
