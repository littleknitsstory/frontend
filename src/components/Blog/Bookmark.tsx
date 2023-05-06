import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/services/hooks";
import { addToSavedPost, removeSavedPost } from "@/services/redux/posts/postsSlice";
import { IArticle } from "@/services/types";
// import { useGetArticleQuery } from "../features/api/apiSlice";
import bookmarkIcon from "/icons/bookmark.svg";
import Image from "next/image";
import BookmarkSVG from "../SVG/BookmarkSVG";

interface IBookmarks {
  slugPost: string;
}
const Bookmark = ({ slugPost }: IBookmarks) => {
  const { i18n } = useTranslation();
  const [isAddedPost, setIsAddedPost] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const savedPostsSlugs = useAppSelector((state) => state.posts.posts);
  // const { data: article } = useGetArticleQuery({ slug: slugPost, lang: i18n.language });

  const addSavedPost = (slug: string): void => {
    dispatch(addToSavedPost(slugPost));
    setIsAddedPost(true);
  };

  const removeToSavedPost = (slug: string): void => {
    dispatch(removeSavedPost(slugPost));
    setIsAddedPost(false);
  };

  useEffect(() => {
    const isSaved = savedPostsSlugs.some((slug: string) => slug === slugPost);
    if (isSaved) {
      setIsAddedPost(true);
    }

    return () => {
      setIsAddedPost(false);
    };
  }, [slugPost]);

  return (
    <div
      onClick={isAddedPost ? () => removeToSavedPost(slugPost) : () => addSavedPost(slugPost)}
      className={isAddedPost ? "card-article__save-icon active" : "card-article__save-icon"}
    >
      <BookmarkSVG />
    </div>
  );
};

export default Bookmark;
