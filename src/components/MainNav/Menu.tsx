import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { useGetMenuQuery } from "@/services/features/api/apiSlice";
import { IMenu } from "@/services/types";

interface Props {
  type: "footer" | "header";
}

const Menu = (props: Props) => {
  const { locale: language, pathname } = useRouter();
  const { data: menu, isError } = useGetMenuQuery({ lang: language ?? "en" });
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
          <a key={item.id} href={item.url} target={item.target}>
            {item.name}
          </a>
        ) : (
          <li key={item.id} className="nav-item">
            <Link
              className={`nav-link text-uppercase header-nav-link ${
                pathname === item.url ? "active" : ""
              }`}
              href={item.url}
            >
              {item.name}
            </Link>
          </li>
        ),
      )}
    </>
  );
};

export default Menu;
