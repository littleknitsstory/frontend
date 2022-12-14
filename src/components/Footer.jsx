import React from "react";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";
import useLksService from "../assests/api";
import Spinner from "./Spinner";
import Social from "./Social";

import vk from "../assests/images/logo-vk_white.svg";
import instagram from "../assests/images/logo-instagram_white.svg";
import facebook from "../assests/images/logo-facebook_white.svg";
import pinterest from "../assests/images/logo-pinterest_white.svg";

const Footer = () => {
  const { t } = useTranslation();
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
                <h2> {t("Navigation")}</h2>
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
              </div>
              {/* <div className="footer__personal-account">
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
              </div> */}
            </nav>
            <div className="subscribe-input">
              <input type="email" placeholder={t("Your e-mail")} />
              <button className="lks btn">{t("Subscribe")}</button>
            </div>
            <div className="subtitle">
              {t(
                "We run special promotions for our customers. subscribe and we will keep you informed"
              )}
            </div>
            <div className="social-dark">
              <Social
                vk={vk}
                instagram={instagram}
                facebook={facebook}
                pinterest={pinterest}
              />
            </div>

            <div className="copyright">
              Little Knits Story 2017 | All Rights Reserved
              <br />
              <br />
              {t("Privacy Policy")}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default withTranslation()(Footer);
