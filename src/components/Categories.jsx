import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLksService from "../assests/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { error, getCategories } = useLksService();

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div className="lks-container">
      {error ? (
        <h3>Что-то пошло не так, данные не получены</h3>
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
