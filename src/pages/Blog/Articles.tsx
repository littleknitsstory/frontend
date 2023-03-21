import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useGetArticlesQuery } from "../../components/features/api/apiSlice";
import CardArticle from "../../components/blog/CardArticle";
import PageError from "../PageError";

import Spinner from "../../components/utils/Spinner";
import arrowRight from "../../assets/icons/arrow-right.svg";

const Articles = () => {
  const [limit, setLimit] = useState<number>(4);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const {
    data: articles,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetArticlesQuery({ limit, lang: i18n.language });

  useEffect(() => {
    if (articles) {
      if (limit !== 4 && limit >= articles?.count) {
        setIsLastPage(true);
      }
    }
  }, [limit]);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <main className="posts">
      
    </main>


    
    
  );
};

export default Articles;


// <Container>
//       <div className="articles">
//         <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
//           {articles?.results.map((item) => {
//             return (
//               <Col key={item.slug}>
//                 <CardArticle article={item} />
//               </Col>
//             );
//           })}
//         </Row>
//         {isFetching ? (
//           <Spinner />
//         ) : (
//           !isLastPage && (
//             <button className="btn btn_border" onClick={() => setLimit((prev) => prev + 4)}>
//               <div className="btn__text">{t("seeMore")}</div>
//               <div className="btn__icon">
//                 <img src={arrowRight} alt="arrowWhite" />
//               </div>
//             </button>
//           )
//         )}
//       </div>
//     </Container>