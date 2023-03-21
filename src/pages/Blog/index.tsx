import Articles from "./Articles";
import MainSliderArticle from "../../components/blog/MainSliderArticle";
import { ReactComponent as ArrowRightSVG } from "../../assets/icons/arrow-right-nd.svg"
import { ReactComponent as ArrowLeftSVG } from "../../assets/icons/arrow-left-nd.svg"
import { useCallback, useEffect, useRef, useState } from "react";
import CardArticle from "../../components/blog/CardArticle";
import { useGetArticlesQuery } from "../../components/features/api/apiSlice";
import Spinner from "../../components/utils/Spinner";
import PageError from "../PageError";
import { useTranslation } from "react-i18next";
import { IArticle } from "../../app/types";
import avatar from "../../assets/images/test-avatar.png"

const Posts = () => {
  const [limit, setLimit] = useState<number>(3);
  const { t, i18n } = useTranslation();
  const observer = useRef<IntersectionObserver>();

  const {
    data: articles,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetArticlesQuery({ limit, lang: i18n.language });

  const hasMore = articles ? articles.count > limit : false

  const elementsForSlider = [
    <button key={1} className="btn btn--tag">Урок</button>,
    <button key={2} className="btn btn--tag">Инструменты</button>,
    <button key={3} className="btn btn--tag">Обзор</button>,
    <button key={4} className="btn btn--tag">Пряжа</button>,
    <button key={5} className="btn btn--tag">История</button>
  ]
  
  const [elements, setElements] = useState(elementsForSlider)
  
  const sliderForward = () => {
      setElements(prevArray => {
        const updated = [...prevArray]
        updated.unshift(updated.pop()!)
        return updated
      })
  }
  const sliderBackward = () => {
      setElements(prevArray => {
        const updated = [...prevArray]
        updated.push(updated.shift()!)
        return updated
      })
  }

  const loaderRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setLimit((prevLimit) => prevLimit + 4);
          }
        },
        {
          rootMargin: "40px",
        },
      );
      observer.current.observe(node);
    },
    [hasMore, isFetching],
  );

  const postsAside = (article: IArticle) => (
    <div className="posts__aside" key={article.slug}>
      <div className="posts__aside--header">
        <img src={avatar} alt="" className="posts__aside--avatar" />
        <p className="posts__aside--author">{article.author}</p>
      </div>
      <p className="posts__aside--title">{article.title}</p>
    </div>
  )

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <>
      <main className="posts">
        <div className="posts__wrapper">
          <div className="posts__tags-slider">
            <ArrowLeftSVG onClick={sliderBackward} className="posts__btn--arrow"/>
              <div className="posts__tags">
                {elements.slice(0, 5)}
              </div>
            <ArrowRightSVG onClick={sliderForward} className="posts__btn--arrow"/>
          </div>
          <article className="posts__articles">
            {articles?.results.map(article => <CardArticle key={article.slug} article={article}/>)}
          </article>
          <div ref={loaderRef} />
        </div>
        <div className="posts__divider"></div>
        <aside className="posts__aside-wrapper">
          <h2>Новости</h2>
          {articles?.results.slice(0, 3).map(article => postsAside(article))}
        </aside>
      </main>
    </>
  );
};

export default Posts;
