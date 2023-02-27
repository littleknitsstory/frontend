import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useGetArticlesQuery } from "../features/api/apiSlice";

// components
import CardArticle from "./CardArticle";
import Spinner from "./Spinner";
import Page404 from "./Page404";

// assets
import arrowRight from "../assets/icons/arrow-right.svg";

const Articles = () => {
  const { i18n } = useTranslation()
  const {
    data: articles,
    isFetching,
    isError,
  } = useGetArticlesQuery({lang: i18n.language})
  const { t } = useTranslation();

  const [limit, setLimit] = useState<number>(4);
  const [isAllShown, setAllShown] = useState<boolean>(false);

  useEffect(() => {
    if (articles) setAllShown(limit > articles?.results.length)
  }, [articles, limit]);

  if (isFetching) {
    return <Spinner />
  }

  if (isError) {
    return <Page404 />
  }

  return (
    <Container>
      <div className="articles">
        <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
          {articles?.results.slice(0, limit).map((item) => {
            return (
              <Col key={item.slug}>
                <CardArticle article={item} />
              </Col>
            );
          })}
        </Row>
        {!isAllShown && (
          <button 
            className="btn btn_border btn__text" 
            onClick={() => setLimit(prev => prev + 4)}
          >
            {t("seeMore")}
            <img src={arrowRight} alt="arrowWhite" />
          </button>
        )}
      </div>
    </Container>
  );
};

export default Articles;
