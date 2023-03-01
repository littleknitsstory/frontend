import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetArticleQuery } from "../features/api/apiSlice";

import Articles from "./Articles";
import PageError from "./PageError";
import Spinner from "./Spinner";

const Article = () => {
  const { slug } = useParams<string>();
  const { t, i18n } = useTranslation();
  const {
    data: article,
    isLoading,
    isError,
    error
  } = useGetArticleQuery({ slug, lang: i18n.language })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <section className="article">
      <Container>
        {article && (
          <div>
            <h3 className="title">{article.title}</h3>
            <div className="article__wrapper-article">
              <div
                className="article__text"
                dangerouslySetInnerHTML={{
                  __html: article.content,
                }}
              ></div>
            </div>
          </div>
        )}
        <h3 className="title">{t("otherPosts")}</h3>
        <Articles />
      </Container>
    </section>
  );
};

export default Article;
