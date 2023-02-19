import { useState, useEffect, useContext } from "react";
import { IMenu, IMenuResponse } from "../../../api/models";
import { getMenu } from "../../../api";
import { Link, NavLink } from "react-router-dom";

import { LanguageContext } from "../../../App";

import "./primary-nav.scss";

const PrimaryNav = () => {
  const [menu, setMenu] = useState<IMenu[] | []>([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const fetchMenu = async (): Promise<void> => {
      const data: IMenuResponse | void = await getMenu({
        headers: { "Accept-Language": language },
      });
      if (data) {
        setMenu(data.results);
      }
    };
    fetchMenu();
  }, [language]);

  return (
    <>
      {menu.map((item) =>
        item.target ? (
          <Link
            key={item.id}
            className="primary-nav-links"
            to={item.url}
            target={item.target}
          >
            {item.name}
          </Link>
        ) : (
          <NavLink key={item.id} className="primary-nav-links" to={item.url}>
            {item.name}
          </NavLink>
        )
      )}
    </>
  );
};
export default PrimaryNav;
