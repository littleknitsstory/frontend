import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import RootLayout from "@/components/Layouts/RootLayout";
import HeaderNav from "@/components/MainNav/HeaderNav";
import Link from "next/link";
import styles from "../components/MainNav/mainNav.module.scss";
import { IMenuResponse } from "@/services/types";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";

export default function Home(props: { menu: IMenuResponse }) {
  const { t } = useTranslation("header");

  const router = useRouter();

  return (
    <>
      <div>Home Page</div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["header", "footer"])),
    },
  };
}
