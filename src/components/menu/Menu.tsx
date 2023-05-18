"use client";
import Link from "next/link";
import { ROUTES } from "@/services/constants";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Menu() {
  const segment = useSelectedLayoutSegment() ?? "";

  return (
    <nav className="">
      <div className="">
        <ul className="nav flex-row text text--md w-100 justify-content-evenly justify-content-md-start mt-3 gap-5">
          <li>
            <Link
              href={ROUTES.ARTICLES}
              className={`nav-link ${
                ROUTES.ARTICLES.includes(segment) ? "active" : ""
              }`}
            >
              Articles
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
