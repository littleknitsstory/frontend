"use client";
import Link from "next/link";
import { ROUTES } from "@/services/constants";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

export default function Menu({ params }: { params: any }) {
  const segment = useSelectedLayoutSegment() ?? "";
  console.log(
    "file: Menu.tsx:7 ~ Menu ~ segment",
    ROUTES.ARTICLES.includes(segment)
  );

  return (
    <nav className="">
      <div className="">
        <ul className="nav flex-row text text--md w-100 justify-content-evenly justify-content-md-start mt-3 gap-5">
          {/* <li className="nav-item">
            <Link href={ROUTES.HOME} className="nav-link">
              Home
            </Link>
          </li> */}
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
