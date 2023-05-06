import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useGetFeaturesQuery } from "@/services/features/api/apiSlice";
import { ROUTES } from "../../services/routes";
import Menu from "./Menu";
import UserSVG from "../SVG/UserSVG";

const HeaderNav = () => {
  const router = useRouter();
  const { data: feature } = useGetFeaturesQuery();
  const [currentLanguage, setCurrentLanguage] = useState("English");

  useEffect(() => {
    switch (router.locale) {
      case "ru":
        setCurrentLanguage("Русский");
        break;
      case "en":
        setCurrentLanguage("English");
        break;
    }
  }, [router.locale]);

  const languageToggler = (): string => {
    switch (router.locale) {
      case "ru":
        return "en";
      case "en":
        return "ru";
      default:
        return "en";
    }
  };

  const changeLanguageHandler = (): void => {
    const { pathname, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: languageToggler() });
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav flex-row text text--md w-100 justify-content-between justify-content-md-start mt-3 gap-lg-5 gap-4">
        <Menu type={"header"} />
        <div className="d-flex ms-auto gap-3 d-none d-md-flex">
          <div className="vr"></div>
          {feature?.account && (
            <Link href={ROUTES.PROFILE} className="navbar__icon align-self-center">
              <UserSVG active={router.pathname === "/" ? true : false} />
            </Link>
          )}

          <Link href={ROUTES.BOOKMARKS} className="navbar__icon align-self-center">
            <Image
              src="/icons/bookmark-link.svg"
              alt="Bookmark Icon"
              className={router.pathname == "/" ? "active" : ""}
              width={30}
              height={30}
            />
          </Link>
          <div className="vr"></div>
          <Link href={ROUTES.FAVORITE_PRODUCTS} className="navbar__icon align-self-center">
            <Image
              src="/icons/heart-big.svg"
              alt="Heart Icon"
              className={router.pathname == "/" ? "active" : ""}
              width={30}
              height={30}
            />
          </Link>
          <Link href={ROUTES.CART} className="navbar__icon align-self-center">
            <Image
              src="/icons/bag.svg"
              alt="Bag Icon"
              className={router.pathname == "/" ? "active" : ""}
              width={30}
              height={30}
            />
          </Link>
          <div className="vr"></div>
          <p
            className="navbar__change-lang navbar__icon align-self-center m-0"
            onClick={changeLanguageHandler}
          >
            {currentLanguage}
          </p>
        </div>
      </ul>
    </nav>
  );
};
export default HeaderNav;
