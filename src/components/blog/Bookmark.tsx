import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToSavedPost, removeSavedPost } from "../../components/features/posts/postsSlice";
import { IArticle } from "../../app/types";
import { useGetArticleQuery } from "../features/api/apiSlice";
import { ReactComponent as BookmarkIcon } from "../../assets/icons/bookmark.svg";

interface IBookmarks {
  slugPost: string;
}
const Bookmark = ({ slugPost }: IBookmarks) => {
  const { i18n } = useTranslation();
  const [isAddedPost, setIsAddedPost] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const savedPostsSlugs = useAppSelector((state) => state.posts.posts);
  const { data: article } = useGetArticleQuery({ slug: slugPost, lang: i18n.language });

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
    <BookmarkIcon
      onClick={isAddedPost ? () => removeToSavedPost(slugPost) : () => addSavedPost(slugPost)}
      className={isAddedPost ? "card-article__save-icon active" : "card-article__save-icon"}
    />
  );
};

export default Bookmark;
