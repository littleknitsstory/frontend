import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { addToSavedPost, removeSavedPost } from "@/services/redux/posts/postsSlice";
import { IArticle } from "@/services/types";
// import { useGetArticleQuery } from "../features/api/apiSlice";
import bookmarkIcon from "/icons/bookmark.svg";
import Image from "next/image";
import BookmarkSVG from "../SVG/BookmarkSVG";

interface Props {
  slug: string;
}
const Bookmark = ({ slug }: Props) => {
  const { i18n } = useTranslation();
  const [isAddedPost, setIsAddedPost] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const savedPostsSlugs = useAppSelector((state) => state.posts.posts);
  // const { data: article } = useGetArticleQuery({ slug: slugPost, lang: i18n.language });

  const addSavedPost = (): void => {
    dispatch(addToSavedPost(slug));
    setIsAddedPost(true);
  };

  const removeToSavedPost = (): void => {
    dispatch(removeSavedPost(slug));
    setIsAddedPost(false);
  };

  useEffect(() => {
    const isSaved = savedPostsSlugs.some((savedSlug: string) => savedSlug === slug);
    if (isSaved) {
      setIsAddedPost(true);
    }

    return () => {
      setIsAddedPost(false);
    };
  }, [slug]);

  return (
    <div
      onClick={isAddedPost ? () => removeToSavedPost() : () => addSavedPost()}
      className={isAddedPost ? "card-article__save-icon active" : "card-article__save-icon"}
    >
      <BookmarkSVG />
    </div>
  );
};

export default Bookmark;
