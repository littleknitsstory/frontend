import Link from "next/link";
import { useGetMenuQuery } from "@/services/features/api/apiSlice";
import styles from "./mainNav.module.scss";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IMenuResponse } from "@/services/types";

function HeaderNav() {
  const { locale: language } = useRouter();

  const { data: menuClient, isLoading, isError } = useGetMenuQuery({ lang: language ?? "en" });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Cannot load menu, please refresh page!</p>;
  }

  // const menu = props.menuSSG

  return (
    <ul className="navbar-nav flex-row justify-content-between text-uppercase mt-3">
      {menuClient?.results
        .filter((navItem) => navItem.menu.hint === "header")
        .sort((a, b) => a.ordering - b.ordering)
        .map((navItem) => (
          <li key={navItem.id} className="nav-item">
            <Link href={navItem.url} className={`${styles.navLink} nav-link text--md`}>
              {navItem.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}
export default HeaderNav;
