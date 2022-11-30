import React from "react";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useLksService from "../assests/api";
import Spinner from "./Spinner";

import vk from "../static/images/logo-vk.svg";
import instagram from "../static/images/logo-instagram.svg";
import facebook from "../static/images/logo-facebook.svg";
import pinterest from "../static/images/logo-pinterest.svg";
import shoppingBag from "../static/images/shopping-bag.svg";
import heart from "../static/images/heart.svg";

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
    <div className="lks-container">
      <div className="row">
        <div className="col-12">
          <div className="links">
            <nav>
              <div className="social">
                <a href="https://vk.com/littleknitsstory" target="_blank">
                  <img src={vk} alt="vk" />
                </a>
                <a
                  href="https://www.facebook.com/littleknitsstory/"
                  target="_blank"
                >
                  <img src={facebook} alt="facebook" />
                </a>
                <a
                  href="https://www.instagram.com/littleknitsstory/"
                  target="_blank"
                >
                  <img src={instagram} alt="instagram" />
                </a>
                <a
                  href="https://www.pinterest.ru/littleknitsstory/"
                  target="_blank"
                >
                  <img src={pinterest} alt="pinterest" />
                </a>
              </div>
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
    </div>
  );
};

export default Menu;
