import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import Articles from "./Articles";
import { useTranslation } from "react-i18next";
import { useGetArticleQuery } from "../features/api/apiSlice";
import Page404 from "./Page404";

const Article = () => {
  const { slug } = useParams<string>();
  const { t, i18n } = useTranslation();
  const {
    data: article,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetArticleQuery({ slug: slug, lang: i18n.language })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <Page404 />
  }

  return (
    <section className="article">
      <Container>
        <div>
          <h3 className="title">{article?.title}</h3>
          <div className="article__wrapper-article">
            <div
              className="article__text"
              dangerouslySetInnerHTML={{
                __html: article?.content!,
              }}
            ></div>
          </div>
        </div>
        <h3 className="title">{t("otherPosts")}</h3>
        <Articles />
      </Container>
    </section>
  );
};

export default Article;
