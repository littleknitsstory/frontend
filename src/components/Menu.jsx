import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLksService from "../assests/api";
import Spinner from "./Spinner";
import Social from "./Social";

import shoppingBag from "../assests/images/shopping-bag.svg";
import heart from "../assests/images/heart.svg";
import vk from "../assests/images/logo-vk.svg";
import instagram from "../assests/images/logo-instagram.svg";
import facebook from "../assests/images/logo-facebook.svg";
import pinterest from "../assests/images/logo-pinterest.svg";
import { Container } from "react-bootstrap";

const Menu = ({ hasProducts, isSaved }) => {
  const [menu, setMenu] = useState([]);
  const { getMenu, error, loaded } = useLksService();
  const [isFixed, setIsFixed] = useState(false);

  function isExternal(url) {
    return url.search(/http(s?):\/\//) > -1;
  }

  useEffect(() => {
    getMenu().then((data) => setMenu(data.results));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 167) {
        setIsFixed(true);
      } else if (window.scrollY < 165) {
        setIsFixed(false);
      }
    });
  }, [isFixed]);

  return (
    <div className="lks-container">
      <div className="row">
        <div className="col-12">
          <div className={isFixed ? "links fixed" : "links"}>
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
                          <Link
                            to={item.url}
                            className={
                              window.location.pathname == item.url
                                ? "nav-current-active"
                                : "nav-current"
                            }
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                          >
                            {item.name}
                          </Link>
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
