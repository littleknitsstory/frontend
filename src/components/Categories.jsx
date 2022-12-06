import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLksService from "../assests/api";
import Spinner from "./Spinner";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { error, getCategories, loaded } = useLksService();

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div className="lks-container">
      {error || !loaded ? (
        <Spinner />
      ) : (
        <div>
          <h3>Категории</h3>
          {categories.map((category) => (
            <ul key={category.slug}>
              <Link to={`/categories/${category.slug}`}>
                {" "}
                <li>{category.title}</li>
              </Link>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
