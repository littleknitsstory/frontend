import Link from "next/link";
import { ROUTES } from "@/app/routes";
import { IFeaturesFlags } from "@/app/types";
import { Locale, i18n } from "@/i18n-config";

export default function Menu({ features }: { features: IFeaturesFlags }) {
  return (
    <nav className="">
      <div className="">
        {features.menu && (
          <ul className="nav flex-row text text--md w-100 justify-content-evenly justify-content-md-start mt-3 gap-5">
            <li className="nav-item">
              <Link href={ROUTES.HOME} className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href={ROUTES.ARTICLES} className="nav-link">
                Articles
              </Link>
            </li>
          </ul>
        )}
        {/* <div className="d-flex ms-auto gap-3 d-none d-md-flex">
          <div className="vr"></div>
          {feature?.account && (
            <NavLink
              to={ROUTES.PROFILE}
              className="navbar__icon align-self-center"
            >
              {({ isActive, isPending }) => (
                <ProfileIcon className={isActive ? "active" : ""} id="" />
              )}
            </NavLink>
          )}

          <NavLink
            to={ROUTES.BOOKMARKS}
            className="navbar__icon align-self-center"
          >
            <BookMarkIcon
              id="bookmark-icon-svg"
              className="align-self-center"
            />
          </NavLink>
          <div className="vr"></div>
          <NavLink
            to={ROUTES.FAVORITE_PRODUCTS}
            className="navbar__icon align-self-center"
          >
            <HeartIcon id="favorite-icon-svg" className="align-self-center" />
          </NavLink>
          <NavLink to={ROUTES.CART} className="navbar__icon align-self-center">
            <BagIcon id="bag-icon-svg" />
          </NavLink>
          <div className="vr"></div>
          <p
            className="navbar__change-lang navbar__icon align-self-center m-0"
            onClick={changeLang}
          >
            {lang}
          </p>
        </div> */}
      </div>
    </nav>
  );
}
