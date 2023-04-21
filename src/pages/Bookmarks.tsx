import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import CardArticle from "../components/blog/CardArticle";
import { ROUTES } from "../app/routes";
import { useTranslation } from "react-i18next";

const Bookmarks = () => {
  const { t } = useTranslation();
  const savedPostsSlugs = useAppSelector((state) => state.posts.posts);
  if (savedPostsSlugs.length === 0) {
    return (
      <div className="cart--empty">
        <p>{t("emptyBookmarks")}</p>
        <NavLink to={ROUTES.ARTICLES}>{t("otherPosts")}</NavLink>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <article className="posts__articles">
        {savedPostsSlugs?.map((slug) => (
          <CardArticle key={slug} slug={slug} />
        ))}
      </article>
    </div>
  );
};
export default Bookmarks;
