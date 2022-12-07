import React from "react";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useLksService from "../assests/api";
import Spinner from "./Spinner";
import Social from "./Social";

import shoppingBag from "../assests/images/shopping-bag.svg";
import heart from "../assests/images/heart.svg";
import vk from "../assests/images/logo-vk.svg";
import instagram from "../assests/images/logo-instagram.svg";
import facebook from "../assests/images/logo-facebook.svg";
import pinterest from "../assests/images/logo-pinterest.svg";

const Menu = ({ hasProducts, isSaved }) => {
  const [menu, setMenu] = useState([]);
  const { getMenu, error, loaded } = useLksService();

  function isExternal(url) {
    return url.search(/http(s?):\/\//) > -1;
  }

  useEffect(() => {
    getMenu().then((data) => setMenu(data.results));
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="links">
          <nav>
            <Social
              vk={vk}
              instagram={instagram}
              facebook={facebook}
              pinterest={pinterest}
            />
            <ul>
              {error || !loaded ? (
                <Spinner />
              ) : (
                menu
                  .sort((a, b) => {
                    return Math.sign(a.ordering - b.ordering);
                  })
                  .map((item) => (
                    <li key={item.id}>
                      {isExternal(item.url) ? (
                        <a href={item.url} target="_blank">
                          {item.name}
                        </a>
                      ) : (
                        <NavLink to={item.url} className="nav-current">
                          {item.name}
                        </NavLink>
                      )}
                    </li>
                  ))
              )}
            </ul>
            <div className="controls">
              <Link to="/cart">
                <img src={shoppingBag} alt="shoppingBag" />
                <div className={hasProducts ? "dot lit" : "dot"}></div>
              </Link>
              <Link to="/saved">
                <img src={heart} alt="heart" />
                <div className={isSaved ? "dot lit" : "dot"}></div>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Menu;
