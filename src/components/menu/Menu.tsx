import { useState, useEffect } from "react";
import { IMenu } from "../../app/types";
import { NavLink } from "react-router-dom";

import i18next from "../../i18n";
import { useGetMenuQuery } from "../features/api/apiSlice";

interface propTypes {
  type: "footer" | "header";
  className: string;
}

const PrimaryNav = (props: propTypes) => {
  const { data: menu, isError } = useGetMenuQuery({ lang: i18next.language });
  const [sortedMenuItem, setSortedMenuItem] = useState<IMenu[] | []>([]);

  useEffect(() => {
    // Filtering "Header" / "Footer" menu items
    if (menu) {
      const filteredMenu: IMenu[] = menu.results
        .filter((item) => item.menu.hint === props.type)
        .sort((a, b) => a.ordering - b.ordering);
      setSortedMenuItem(filteredMenu);
    }
  }, [menu, props.type]);

  if (isError) {
    return <div className="error--menu">Cannot load menu, please refresh page!</div>;
  }

  return (
    <>
      {sortedMenuItem.map((item) =>
        item.target ? (
          <a key={item.id} className={props.className} href={item.url} target={item.target}>
            {item.name}
          </a>
        ) : (
          <NavLink key={item.id} className={props.className} to={item.url}>
            {({ isActive, isPending }) => (
              <span className={isActive ? "active" : ""}>{item.name}</span>
            )}
          </NavLink>
        ),
      )}
    </>
  );
};

export default PrimaryNav;
