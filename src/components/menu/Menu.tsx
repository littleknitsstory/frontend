"use client";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

import { ROUTES } from "@/services/constants";
import LanguageToggler from "../utils/LanguageToggler";
import LinkLocale from "../utils/LinkLocale";
import { Menu } from "@/services/types";
import { useEffect, useState } from "react";

interface Props {
  menu: Menu[];
  type: "header" | "footer";
}

export default function Menu({ menu, type }: Props) {
  const segment = useSelectedLayoutSegment() ?? "";
  const pathname = usePathname();
  const [sortedMenuItem, setSortedMenuItem] = useState<Menu[] | []>([]);
  useEffect(() => {
    // Filtering "Header" / "Footer" menu items
    if (menu) {
      const filteredMenu: Menu[] = menu
        .filter((item) => item.menu.hint === type)
        .sort((a, b) => a.ordering - b.ordering);
      setSortedMenuItem(filteredMenu);
    }
  }, [menu, type]);

  return (
    <nav className="">
      <div className="">
        <ul className="nav flex-row text text--md w-100 justify-content-evenly justify-content-md-start mt-3 gap-5 align-items-center">
          {sortedMenuItem.map((item) =>
            item.target ? (
              <a key={item.id} href={item.url} target={item.target}>
                {item.name}
              </a>
            ) : (
              <li key={item.id} className="nav-item">
                <LinkLocale
                  href={item.url}
                  className={`nav-link ${
                    item.url === `/${segment}/` ? "active" : ""
                  }`}
                >
                  {item.name}
                </LinkLocale>
              </li>
            )
          )}
          <div className="ms-auto text">
            <LanguageToggler />
          </div>
        </ul>
      </div>
    </nav>
  );
}
