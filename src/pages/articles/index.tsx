import { GetStaticProps } from "next";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getArticles, getFeaturesFlags } from "@/services/api/apiClient";
import { IArticle, IFeaturesFlags } from "@/services/types";
import CardArticle from "@/components/Blog/CardArticle";
import parse from "html-react-parser";

interface Tag {
  title: string;
  slug: string;
}

interface Props {
  articles: IArticle[];
  features: IFeaturesFlags;
}

const INITIAL_LIMIT = 3;

function index({ articles, features }: Props) {
  const { t } = useTranslation("articles");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<IArticle[]>([]);
  const [shownPosts, setShownPosts] = useState<IArticle[]>(articles);
  const [limit, setLimit] = useState<number>(INITIAL_LIMIT);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (articles) {
      const tagsSet: { [key: string]: string } = articles?.reduce(
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
  }, [articles]);

  const selectTagHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    if (selectedTag === e.currentTarget.dataset.slug) {
      setSelectedTag("");
    } else {
      setSelectedTag(e.currentTarget.dataset.slug || "");
    }
  };

  const activeStyle = {
    backgroundColor: "#5E6959",
    color: "#FEFEFE",
  };

  useEffect(() => {
    setShownPosts(filteredPosts.slice(0, limit));
  }, [filteredPosts, limit]);

  const loaderRef = useCallback((node: HTMLDivElement) => {
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
  }, []);

  useEffect(() => {
    const filteredByTag: IArticle[] =
      articles?.filter((post) =>
        selectedTag ? post.tags.some((tag) => tag.slug === selectedTag) : true,
      ) ?? [];
    setFilteredPosts(filteredByTag);
  }, [articles, selectedTag, limit]);

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

  return (
    <>
      {features?.blog && (
        <main className=" mt-5">
          <div className="d-flex align-items-center justify-content-evenly mb-4">
            <Image
              src="/icons/arrow-left.svg"
              alt="Left Arrow"
              width={30}
              height={30}
              onClick={sliderBackward}
              className="posts__btn--arrow d-none d-md-block"
            />
            <div className="d-flex gap-3">
              {tags.map((item) => (
                <button
                  key={item.slug}
                  onClick={selectTagHandler}
                  data-slug={item.slug}
                  className="btn btn--tag"
                  style={selectedTag === item.slug ? activeStyle : {}}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <Image
              src="/icons/arrow-right.svg"
              alt="Left Arrow"
              width={30}
              height={30}
              onClick={sliderForward}
              className="posts__btn--arrow d-none d-md-block"
            />
          </div>
          {shownPosts.map((post) => (
            <CardArticle key={post.slug} article={post} />
          ))}
          <div ref={loaderRef} />
        </main>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const language = context.locale ?? "en";

  const articles = await getArticles(language);
  const features = await getFeaturesFlags();

  if (articles.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(language, ["header", "footer", "articles"])),
      articles,
      features,
    },
  };
};

export default index;
