import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import Articles from "./Articles";
import { useTranslation } from "react-i18next";
import { useGetArticleDetailsQuery } from "../store/apiSlice";
import PageError from "./PageError";

const Article = () => {
  const { t } = useTranslation();
  const { slug } = useParams<string>();
  const {
    data: article,
    isError,
    isLoading,
    error,
  } = useGetArticleDetailsQuery({ slug });

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
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
