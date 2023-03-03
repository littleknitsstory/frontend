import sanitizeHtml from "sanitize-html";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetArticlesQuery } from "../features/api/apiSlice";

import Spinner from "../utils/Spinner";
import PageError from "../../pages/PageError";
// assets
import arrowWhite from "../../assets/icons/arrow-right-white.svg";
import kateSlider from "../../assets/images/kate-slider.png";

const MainSlider = () => {
  const { t, i18n } = useTranslation();
  const {
    data: articles,
    isLoading,
    isError,
    error,
  } = useGetArticlesQuery({ lang: i18n.language, limit: 3 });

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <section className="main-slider">
      <Container>
        <Carousel fade={true}>
          {articles?.results.map((item) => {
            return (
              <Carousel.Item interval={1800} key={item.slug}>
                <Row>
                  <Col xs={12} md={12} lg={4} xl={4} xxl={4}>
                    <div className="main-slider__wrapper-img">
                      <img className="main-slider__img" src={kateSlider} alt="First slide" />
                    </div>
                  </Col>
                  <Col xs={12} md={12} lg={8} xl={8} xxl={8}>
                    <div className="main-slider__wrapper">
                      <div className="title main-slider__title">{item.title}</div>
                      <div className="main-slider__text">
                        {sanitizeHtml(item.content, {
                          allowedTags: ["p"],
                        }).slice(14, -1)}
                      </div>
                      <div className="main-slider__author">Автор: Катя Анаприенко</div>
                      <div className="main-slider__created_at">{item.created_at}</div>
                      <div className="col-12">
                        <div className="main-slider__btn">
                          <Link to={`/posts/${item.slug}`}>
                            <button className="btn btn_vinous">
                              <div className="btn__text">{t("read")}</div>
                              <div className="btn__icon">
                                <img src={arrowWhite} alt="arrowWhite" />
                              </div>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Container>
    </section>
  );
};

export default MainSlider;
