"use client";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

import { ROUTES } from "@/services/constants";
import LanguageToggler from "../misc/LanguageToggler";
import LinkLocale from "../misc/LinkLocale";

export default function Menu() {
  const segment = useSelectedLayoutSegment() ?? "";
  const pathname = usePathname();

  return (
    <nav className="">
      <div className="">
        <ul className="nav flex-row text text--md w-100 justify-content-evenly justify-content-md-start mt-3 gap-5 align-items-center">
          <li>
            <Link
              href={`${ROUTES.ARTICLES}`}
              className={`nav-link ${
                ROUTES.ARTICLES === `/${segment}` ? "active" : ""
              }`}
            >
              Articles
            </Link>
          </li>
          <li>
            <LinkLocale href={ROUTES.ARTICLES} className="nav-link">
              Articles
            </LinkLocale>
          </li>
          <div className="ms-auto text">
            <LanguageToggler />
          </div>
        </ul>
      </div>
    </nav>
  );
}
