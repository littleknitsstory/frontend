import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToSavedPost, removeSavedPost } from "../../components/features/posts/postsSlice";
import { IArticle } from "../../app/types";
import { useGetArticleQuery } from "../features/api/apiSlice";
import { ReactComponent as BookmarkIcon } from "../../assets/icons/bookmark.svg";

interface IBookmarks {
  slugPost: string | void;
}
const Bookmark = ({ slugPost }: IBookmarks) => {
  const { i18n } = useTranslation();
  const [isAddedPost, setIsAddedPost] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const savedPosts = useAppSelector((state) => state.posts.posts);
  const { data: article } = useGetArticleQuery({ slug: slugPost, lang: i18n.language });

  const addSavedPost = (post: any): void => {
    if (post) {
      dispatch(addToSavedPost(post));
      setIsAddedPost(true);
    }
  };

  const removeToSavedPost = (post: any): void => {
    dispatch(removeSavedPost(post));
    setIsAddedPost(false);
  };

  useEffect(() => {
    const isSaved = savedPosts.some((item) => item.slug === slugPost);
    if (isSaved) {
      setIsAddedPost(true);
    }
    return () => {
      setIsAddedPost(false);
    };
  }, [slugPost]);

  return (
    <BookmarkIcon
      onClick={isAddedPost ? () => removeToSavedPost(article) : () => addSavedPost(article)}
      className={isAddedPost ? "card-article__save-icon active" : "card-article__save-icon"}
    />
  );
};

export default Bookmark;
