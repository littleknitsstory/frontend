import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardArticle from "./CardArticle";
import { IArticle, IArticlesResponse } from "../api/models";
import arrowRight from "../icons/arrow-right.svg";
import { useTranslation } from "react-i18next";
import { baseURL, useGet } from "./Hooks/useFetch";
import { LanguageContext } from "../App";
import Page404 from "./Page404";
import Spinner from "./Spinner";

const Articles = () => {
  const { t } = useTranslation()
  const { language } = useContext(LanguageContext)
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [limit, setLimit] = useState<number>(4);
  const [count, setCount] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const { data, loading, error } = useGet<IArticlesResponse>({
    url: "ARTICLES",
    method: "GET",
    lang: language,
    query: {
      limit: limit,
      offset: 0
    }
  })

  useEffect(() => {
    if (data) {
      const updatedData = {
        ...data,
        results: data.results.map((item) => ({
          ...item,
          image_preview: `${baseURL}${item.image_preview}`,
        })),
      }
      setArticles(updatedData.results)
      setCount(data.count)
    }

    if (limit !== 4 && limit >= count) {
      setIsLastPage(true);
    }
  }, [data, error]);

  const handleSeeMore = useCallback((): void => {
    setLimit((prev) => prev + 4);
  }, []);

  if (error) {
    return (
      <Page404 error={error}/>
    )
  }

  return (
    <Container>
      {loading && <Spinner />}
      <div className="articles">
        <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
          {articles.map((item) => {
            return (
              <Col key={item.slug}>
                <CardArticle article={item} />
              </Col>
            );
          })}
        </Row>
        {!isLastPage && (
          <button className="btn btn_border" onClick={handleSeeMore}>
            <div className="btn__text">{t("seeMore")}</div>
            <div className="btn__icon">
              <img src={arrowRight} alt="arrowWhite" />
            </div>
          </button>
        )}
      </div>
    </Container>
  );
};

export default Articles;
