import React from "react";
import { useEffect, useState } from "react";
import useLksService from "../assests/api";
import Spinner from "./Spinner";

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const { error, getCategories, loaded } = useLksService();

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div>
      {error || !loaded ? (
        <Spinner />
      ) : (
        <div className="categorized-menu lks-card-floating">
          {categories.map((category) => (
            <ul className="categories" key={category.slug}>
              {/* <Link to={`/categories/${category.slug}`}> */}
              <li className=" category lks-mod-pointer">{category.title}</li>
              {/* </Link> */}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
