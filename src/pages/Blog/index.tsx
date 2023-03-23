// import Articles from "./Articles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IArticle } from "../../app/types";
import { useGetArticlesQuery } from "../../components/features/api/apiSlice";
import CardArticle from "../../components/blog/CardArticle";
import PageError from "../PageError";
import Spinner from "../../components/utils/Spinner";
import { ReactComponent as ArrowRightSVG } from "../../assets/icons/arrow-right-nd.svg"
import { ReactComponent as ArrowLeftSVG } from "../../assets/icons/arrow-left-nd.svg"
import avatar from "../../assets/images/test-avatar.png"

interface Tag {
  title: string;
  slug: string;
}

const Posts = () => {
  const [limit, setLimit] = useState<number>(15);
  const { t, i18n } = useTranslation();
  const [tags, setTags] = useState<Tag[]>([])
  const [elements, setElements] = useState<JSX.Element[]>([])

  const {
    data: articles,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetArticlesQuery({ limit, lang: i18n.language });

  useEffect(() => {
    // get all tags from articles
    if (articles) {
      const tagsSet: { [key: string]: string } = articles?.results.reduce(
        (result: { [key: string]: string }, article: IArticle) => {
          article.tags.forEach((tag) => {
            if (!result[tag.title]) {
              result[tag.title] = tag.slug;
            }
          });
          return result;
        },
        {},
      );
      const allTags: Tag[] = Object.entries(tagsSet).map(([title, slug]) => ({
        title,
        slug,
      }));
      setTags(allTags);
    }
  }, [articles])
  
  useEffect(() => {
    const tagSelectors = tags.map(item => (
      <button key={item.slug} className="btn btn--tag">{item.title}</button>
    ))
    setElements(tagSelectors)
  }, [tags])

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

  const postsAside = (article: IArticle) => (
    <div className="posts__aside" key={article.slug}>
      <div className="posts__aside--header">
        <img src={avatar} alt="" className="posts__aside--avatar" />
        <p className="posts__aside--author">{article.author}</p>
      </div>
      <p className="posts__aside--title">{article.title}</p>
    </div>
  )

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
                {elements}
              </div>
            <ArrowRightSVG onClick={sliderForward} className="posts__btn--arrow"/>
          </div>
          {isFetching && <Spinner />}
          <article className="posts__articles">
            {articles?.results.map(article => <CardArticle key={article.slug} article={article}/>)}
          </article>
        </div>
        <div className="posts__divider"></div>
        <aside className="posts__aside-wrapper">
          <h2>{t("posts.news")}</h2>
          {articles?.results.slice(0, 3).map(article => postsAside(article))}
        </aside>
      </main>
    </>
  );
};

export default Posts;
