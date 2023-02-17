import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import articleImg from "../images/article-img.png";
import CardArticle from "./CardArticle";
import arrowRight from "../icons/arrow-right.svg";
import { Link, useParams } from "react-router-dom";
import { getArticleDetails, getArticles } from "../api";
import { IArticle } from "../api/models";
import Spinner from "./Spinner";
import Articles from "./Articles";
import { useTranslation } from "react-i18next";

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<IArticle | null>(null);

  const { t } = useTranslation()

  useEffect(() => {
    const fetchArticleDetails = async (): Promise<void> => {
      if (!slug) return;
      const data: IArticle | void = await getArticleDetails(slug);
      if (data) {
        setArticle(data);
      }
    };
    fetchArticleDetails();
  }, [slug]);

  return (
    <section className="article">
      <Container>
        {article === null ? (
          <Spinner />
        ) : (
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
