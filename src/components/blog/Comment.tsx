import { CommentsData } from "../../app/types";
import { useDeleteCommentMutation } from "../features/api/apiSlice";
import { useTranslation } from "react-i18next";
import Spinner from "../utils/Spinner";
import { Store } from "react-notifications-component";
import { notificationError } from "../modal/Notification";

const Comment = (comment: CommentsData) => {
  const [deleteComment, { isLoading, isError, error }] = useDeleteCommentMutation();
  const { t, i18n } = useTranslation();

  async function handleDeleteComment(): Promise<void> {
    deleteComment({ postId: comment.id, lang: i18n.language })
      .unwrap()
      .catch((error) => {
        Store.addNotification({
          ...notificationError,
          title: error.data.detail,
        });
      });
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="d-flex flex-column mb-4 rounded-4 py-2 px-3 shadow-sm">
      <p className="text text--md text--bold m-0">{comment.author.username}</p>
      <small className="text text--grey text--sm">{comment.created_at}</small>
      <p className="text mt-3">{comment.text}</p>

      <button className="btn btn--transparent align-self-end p-0 m-0" onClick={handleDeleteComment}>
        ⛔️
      </button>
      <p className="align-self-end text text--bold text--light-grey m-0">Ответить</p>
    </div>
  );
};
export default Comment;
