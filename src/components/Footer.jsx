import React from "react";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useLksService from "../assests/api";
import Spinner from "./Spinner";
import Social from "./Social";
import cactus from "../assests/images/cactus-logo.svg";
import vk from "../assests/images/logo-vk_white.svg";
import instagram from "../assests/images/logo-instagram_white.svg";
import facebook from "../assests/images/logo-facebook_white.svg";
import pinterest from "../assests/images/logo-pinterest_white.svg";

const Footer = () => {
  const [menu, setMenu] = useState([]);
  const { getMenu, error, loaded } = useLksService();

  function isExternal(url) {
    return url.search(/http(s?):\/\//) > -1;
  }

  useEffect(() => {
    getMenu().then((data) => setMenu(data.results));
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-12">
          <div className="footer">
            <nav>
              <div className="footer__menu">
                <h2>Навигация</h2>
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
                            <NavLink
                              to={item.url}
                              className="nav-current"
                              onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }}
                            >
                              {item.name}
                            </NavLink>
                          )}
                        </li>
                      ))
                  )}
                </ul>
              </div>
              <div className="footer__personal-account">
                <h2>Личный кабинет</h2>
                <ul>
                  <li>
                    <Link to="/login">Войти</Link>
                  </li>
                  <li>
                    <Link to="/cart">Корзина</Link>
                  </li>
                  <li>
                    <Link to="/saved">Сохраненные товары</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="subscribe-input">
              <input type="email" placeholder="Ваш e-mail" />
              <button className="lks btn">Подписаться</button>
            </div>
            <div className="subtitle">
              Мы проводим специальные акции для наших клиентов. оформите
              подписку и мы будем держать вас в курсе
            </div>
            <div className="social">
              <Social
                vk={vk}
                instagram={instagram}
                facebook={facebook}
                pinterest={pinterest}
              />
            </div>

            <div className="copyright">
              Little Knits Story 2017 | All Rights Reserved
              <img src={cactus} alt="Cactus Vision" />
              Политика конфиденциальности
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
