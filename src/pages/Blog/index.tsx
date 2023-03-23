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
import BookmarkIcon from "../../assets/icons/bookmark.svg"
import avatar from "../../assets/images/test-avatar.png"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeSavedPost } from "../../components/features/posts/postsSlice"
import { Link } from "react-router-dom";
import ArticleTitle from "../../components/blog/ArticleTitle";

interface Tag {
  title: string;
  slug: string;
}

const Posts = () => {
  const [limit, setLimit] = useState<number>(15);
  const { t, i18n } = useTranslation();
  const [tags, setTags] = useState<Tag[]>([])
  const [elements, setElements] = useState<JSX.Element[]>([])
  const dispatch = useAppDispatch()
  const savedPosts = useAppSelector(state => state.posts.posts)

  console.log(savedPosts)
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
          <h2 className="posts__subtitle">{t("posts.news")}</h2>
          {articles?.results.slice(0, 3).map(post => (
            <div className="posts__aside" key={post.slug}>
              <div className="posts__aside--header">
                <img src={avatar} alt="" className="posts__aside--avatar" />
                <p className="posts__aside--author">{post.author}</p>
              </div>
              <p className="posts__aside--title">{post.title}</p>
            </div>
          ))}
          <div className="divider"></div>
          <h2  className="posts__subtitle">Список для чтения</h2>
          {savedPosts.length === 0 &&
            <p className="posts__aside--text">
              Кликнете на {<img src={BookmarkIcon}></img>}, чтобы добавить любую историю в ваш список для чтения, и прочитать его позже 
            </p>
          }
          {savedPosts.length > 0 && 
            <div className="posts__saved-posts">
              {savedPosts.map(post => (
                <div className="posts__saved-post-wrapper">
                  <ArticleTitle post={post}/>
                  <button className="btn btn--icon"onClick={() => dispatch(removeSavedPost(post))}>🗑️</button>
                </div>
              ))}
            </div>
          }
        </aside>
      </main>
    </>
  );
};

export default Posts;
