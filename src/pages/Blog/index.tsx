import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IArticle } from "../../app/types";
import { useGetArticlesQuery, useGetFeaturesQuery } from "../../components/features/api/apiSlice";
import CardArticle from "../../components/blog/CardArticle";
import PageError from "../PageError";
import Spinner from "../../components/utils/Spinner";

import { ReactComponent as ArrowRightSVG } from "../../assets/icons/arrow-right-nd.svg";
import { ReactComponent as ArrowLeftSVG } from "../../assets/icons/arrow-left-nd.svg";

interface Tag {
  title: string;
  slug: string;
}

const INITIAL_LIMIT = 3;

const Posts = () => {
  const { data: feature } = useGetFeaturesQuery();
  const [limit, setLimit] = useState<number>(INITIAL_LIMIT);
  const { i18n } = useTranslation();
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<IArticle[]>([]);
  const [shownPosts, setShownPosts] = useState<IArticle[]>([]);
  const observer = useRef<IntersectionObserver>();

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
  } = useGetArticlesQuery({ limit: 200, lang: i18n.language });

  useEffect(() => {
    setShownPosts(filteredPosts.slice(0, limit));
  }, [filteredPosts, limit]);

  const loaderRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setLimit((prevLimit) => prevLimit + 3);
          }
        },
        {
          rootMargin: "40px",
        },
      );
      observer.current.observe(node);
    },
    [isFetching],
  );

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
  }, [posts, selectedTag, limit]);

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

  if (!feature?.blog) {
    return <PageError errorStatus={404} />;
  }

  return (
    <>
      {feature?.blog && (
        <main className="container-lg mt-5">
          <div className="d-flex align-items-center justify-content-evenly mb-4">
            <ArrowLeftSVG
              onClick={sliderBackward}
              className="posts__btn--arrow d-none d-md-block"
            />
            <div className="d-flex gap-3">
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
            <ArrowRightSVG
              onClick={sliderForward}
              className="posts__btn--arrow d-none d-md-block"
            />
          </div>
          {isFetching && <Spinner />}
          {shownPosts?.map((post) => (
            <CardArticle key={post.slug} slug={post.slug} />
          ))}
          <div ref={loaderRef} />
        </main>
      )}
    </>
  );
};

export default Posts;
