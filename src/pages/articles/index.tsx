import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

function index() {
  const { t } = useTranslation("header");
  return (
    <div>
      <p className="text">{t("title")}</p>
    </div>
  );
}
export default index;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["header", "footer"])),
    },
  };
}
