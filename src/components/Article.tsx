import React, { useEffect, useState, useCallback, useContext } from "react";
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
import { useGet } from "./Hooks/useFetch";
import { LanguageContext } from "../App";
import Page404 from "./Page404";

const Article = () => {
  const { language } = useContext(LanguageContext)
  const { t } = useTranslation()
  const { slug } = useParams();
  // const [article, setArticle] = useState<IArticle>();

  const { data, loading, error } = useGet<IArticle>({
    url: "ARTICLES",
    method: "GET",
    lang: language,
    slug: slug,
  })

  if (error) {
    return (
      <Page404 error={error}/>
    )
  }

  return (
    <section className="article">
      <Container>
        {loading && <Spinner />}
        {!loading && 
          <div>
            <h3 className="title">{data?.title}</h3>
            <div className="article__wrapper-article">
              <div
                className="article__text"
                dangerouslySetInnerHTML={{
                  __html: data!.content,
                }}
              ></div>
            </div>
          </div>
        } 
        <h3 className="title">{t("otherPosts")}</h3>
        <Articles />
      </Container>
    </section>
  );
};

export default Article;
