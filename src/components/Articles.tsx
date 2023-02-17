import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardArticle from "./CardArticle";
import { getArticles } from "../api";
import { IArticle, IArticlesResponse } from "../api/models";
import arrowRight from "../icons/arrow-right.svg";

const Articles = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  const [limit, setLimit] = useState<number>(4);
  const [count, setCount] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticles = async (): Promise<void> => {
      const data: IArticlesResponse | void = await getArticles(0, limit);
      if (data) {
        setArticles(data.results);
        setCount(data.count);
      }
    };
    if (limit != 4 && limit >= count) {
      setIsLastPage(true);
    }
    fetchArticles();
  }, [limit]);

  const handleSeeMore = useCallback((): void => {
    setLimit((prev) => prev + 4);
  }, []);

  return (
    <Container>
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
            <div className="btn__text">Смотреть еще</div>
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
