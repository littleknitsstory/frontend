import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardArticle from "./CardArticle";
import Spinner from "./Spinner";
import arrowRight from "../icons/arrow-right.svg";
import { useTranslation } from "react-i18next";
import { useGetArticlesQuery } from "../store/apiSlice";
import PageError from "./PageError";

const Articles = () => {
  const [limit, setLimit] = useState<number>(4);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const { t } = useTranslation();

  const {
    data: articles,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetArticlesQuery({ limit });

  useEffect(() => {
    if (articles) {
      if (limit !== 4 && limit >= articles?.count) {
        setIsLastPage(true);
      }
    }
  }, [limit]);

  const handleSeeMore = useCallback((): void => {
    setLimit((prev) => prev + 4);
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <Container>
      <div className="articles">
        <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
          {articles?.results.map((item) => {
            return (
              <Col key={item.slug}>
                <CardArticle article={item} />
              </Col>
            );
          })}
        </Row>
        {isFetching ? (
          <Spinner />
        ) : (
          !isLastPage && (
            <button className="btn btn_border" onClick={handleSeeMore}>
              <div className="btn__text">{t("seeMore")}</div>
              <div className="btn__icon">
                <img src={arrowRight} alt="arrowWhite" />
              </div>
            </button>
          )
        )}
      </div>
    </Container>
  );
};

export default Articles;
