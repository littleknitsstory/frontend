import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useLksService from "../assests/api";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const { getMenu, error } = useLksService();

  function isExternal(url) {
    return url.search(/http(s?):\/\//) > -1;
  }

  useEffect(() => {
    getMenu().then((data) => setMenu(data.results));
  }, []);

  return (
    <section className="menuNav">
      <div className="lks-container">
        <div className="links">
          <nav>
            <ul>
              {error ? (
                <h3>Что-то пошло не так, данные не получены</h3>
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
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Menu;
