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

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<IArticle | null>(null);

  useEffect(() => {
    const fetchArticleDetails = async (): Promise<void> => {
      if (!slug) return;
      const data = await getArticleDetails(slug);
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

        <h3 className="title">Другие блоги</h3>
        <Articles />
      </Container>
    </section>
  );
};

export default Article;
