"use client";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

import { ROUTES } from "@/services/constants";
import LanguageToggler from "../misc/LanguageToggler";

export default function Menu() {
  const segment = useSelectedLayoutSegment() ?? "";

  return (
    <nav className="">
      <div className="">
        <ul className="nav flex-row text text--md w-100 justify-content-evenly justify-content-md-start mt-3 gap-5 align-items-center">
          <li>
            <Link
              href={ROUTES.ARTICLES}
              className={`nav-link ${
                ROUTES.ARTICLES === `/${segment}` ? "active" : ""
              }`}
            >
              Articles
            </Link>
          </li>
          <div className="ms-auto text">
            <LanguageToggler />
          </div>
        </ul>
      </div>
    </nav>
  );
}
