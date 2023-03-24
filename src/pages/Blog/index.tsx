import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IArticle } from "../../app/types";
import { useGetArticlesQuery } from "../../components/features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeSavedPost } from "../../components/features/posts/postsSlice";
import CardArticle from "../../components/blog/CardArticle";
import PageError from "../PageError";
import Spinner from "../../components/utils/Spinner";
import ArticleTitle from "../../components/blog/ArticleTitle";
import { ReactComponent as ArrowRightSVG } from "../../assets/icons/arrow-right-nd.svg";
import { ReactComponent as ArrowLeftSVG } from "../../assets/icons/arrow-left-nd.svg";
import BookmarkIcon from "../../assets/icons/bookmark.svg";
import avatar from "../../assets/images/test-avatar.png";

interface Tag {
  title: string;
  slug: string;
}

const Posts = () => {
  // const [limit, setLimit] = useState<number>(100);
  const limit = 100;
  const { t, i18n } = useTranslation();
  const [tags, setTags] = useState<Tag[]>([]);
  const dispatch = useAppDispatch();
  const savedPosts = useAppSelector((state) => state.posts.posts);
  const [filteredPosts, setFilteredPosts] = useState<IArticle[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");

  // function to filter posts by tags

  const activeStyle = {
    backgroundColor: "#5E6959",
    color: "#FEFEFE",
  };

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetArticlesQuery({ limit, lang: i18n.language });

  useEffect(() => {
    // get all tags from articles
    if (posts) {
      const tagsSet: { [key: string]: string } = posts?.results.reduce(
        (result: { [key: string]: string }, post: IArticle) => {
          post.tags.forEach((tag) => {
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
  }, [posts]);

  useEffect(() => {
    const filteredByTag: IArticle[] =
      posts?.results.filter((post) =>
        selectedTag ? post.tags.some((tag) => tag.slug === selectedTag) : true,
      ) ?? [];
    setFilteredPosts(filteredByTag);
  }, [posts, selectedTag]);

  const handleSelectTag = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    if (selectedTag === e.currentTarget.dataset.slug) {
      setSelectedTag("");
    } else {
      setSelectedTag(e.currentTarget.dataset.slug || "");
    }
  };

  const sliderForward = () => {
    setTags((prevArray) => {
      const updated = [...prevArray];
      updated.unshift(updated.pop()!);
      return updated;
    });
  };
  const sliderBackward = () => {
    setTags((prevArray) => {
      const updated = [...prevArray];
      updated.push(updated.shift()!);
      return updated;
    });
  };
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
            <ArrowLeftSVG onClick={sliderBackward} className="posts__btn--arrow" />
            <div className="posts__tags">
              {tags.map((item) => (
                <button
                  key={item.slug}
                  onClick={(e: React.SyntheticEvent<HTMLButtonElement>) => handleSelectTag(e)}
                  data-slug={item.slug}
                  className="btn btn--tag"
                  style={selectedTag === item.slug ? activeStyle : {}}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <ArrowRightSVG onClick={sliderForward} className="posts__btn--arrow" />
          </div>
          {isFetching && <Spinner />}
          <article className="posts__articles">
            {filteredPosts?.map((post) => (
              <CardArticle key={post.slug} article={post} />
            ))}
          </article>
        </div>
        <div className="posts__divider"></div>
        <aside className="posts__aside-wrapper">
          <h2 className="posts__subtitle">{t("posts.news")}</h2>
          {posts?.results.slice(0, 3).map((post) => (
            <div className="posts__aside" key={post.slug}>
              <div className="posts__aside--header">
                <img src={avatar} alt="" className="posts__aside--avatar" />
                <p className="posts__aside--author">{post.author}</p>
              </div>
              <p className="posts__aside--title">{post.title}</p>
            </div>
          ))}
          <div className="divider"></div>
          <h2 className="posts__subtitle">Список для чтения</h2>
          {savedPosts.length === 0 && (
            <p className="posts__aside--text">
              {t("posts.readingList1")}
              {<img src={BookmarkIcon} alt="bookmark icon"></img>},{t("posts.readingList2")}
            </p>
          )}
          {savedPosts.length > 0 && (
            <div className="posts__saved-posts">
              {savedPosts.map((post) => (
                <div key={post.slug} className="posts__saved-post-wrapper">
                  <ArticleTitle post={post} />
                  <button className="btn btn--icon" onClick={() => dispatch(removeSavedPost(post))}>
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </aside>
      </main>
    </>
  );
};

export default Posts;
