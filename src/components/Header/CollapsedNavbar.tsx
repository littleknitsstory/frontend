import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import hamburger from "../../../public/icons/hamburger.svg";
import cross from "../../../public/icons/cross.svg";

const CollapsedNavbar = () => {
  const { t } = useTranslation("header");
  return (
    <>
      <button
        className="navbar-toggler collapsed d-sm-block d-md-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsed-navbar"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="opened">
          <Image src={cross} alt="Cross Icon" width={25} height={25} />
        </span>
        <span className="collapsed">
          <Image src={hamburger} alt="Hamburger Icon" width={25} height={25} />
        </span>
      </button>

      <div className="collapse navbar-collapse mt-3 d-md-none" id="collapsed-navbar">
        <ul className="navbar-nav gap-1">
          <li className="nav-item">
            <Link
              href="/"
              className="nav-link d-inline-flex align-items-center gap-3 nav-link"
              data-bs-toggle="collapse"
              data-bs-target="#collapsed-navbar"
            >
              <Image src="/icons/navbar-icons/user.svg" alt="Profile Icon" width={24} height={24} />
              <p className="m-0">{t("account")}</p>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              href="/"
              className="nav-link d-inline-flex align-items-center gap-3 nav-link"
              data-bs-toggle="collapse"
              data-bs-target="#collapsed-navbar"
            >
              <Image
                src="/icons/navbar-icons/courses.svg"
                alt="Courses Icon"
                width={24}
                height={24}
              />
              <p className="m-0">{t("courses")}</p>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              href="/"
              className="nav-link d-inline-flex align-items-center gap-3 nav-link"
              data-bs-toggle="collapse"
              data-bs-target="#collapsed-navbar"
            >
              <Image
                src="/icons/navbar-icons/articles.svg"
                alt="Courses Icon"
                width={24}
                height={24}
              />
              <p className="m-0">{t("articles")}</p>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              href="/"
              className="nav-link d-inline-flex align-items-center gap-3 nav-link"
              data-bs-toggle="collapse"
              data-bs-target="#collapsed-navbar"
            >
              <Image
                src="/icons/navbar-icons/orders.svg"
                alt="Courses Icon"
                width={24}
                height={24}
              />
              <p className="m-0">{t("orders")}</p>
            </Link>
          </li>
          <hr />
          <li className="nav-item">
            <Link
              href="/"
              className="nav-link d-inline-flex align-items-center gap-3 nav-link"
              data-bs-toggle="collapse"
              data-bs-target="#collapsed-navbar"
            >
              <Image
                src="/icons/navbar-icons/logout.svg"
                alt="Courses Icon"
                width={24}
                height={24}
              />
              <p className="m-0">{t("logout")}</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default CollapsedNavbar;
