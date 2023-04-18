import { CommentsData } from "../../app/types";

const Comment = (comment: CommentsData) => {
  return (
    <div className="d-flex flex-column mb-4 rounded-4 py-2 px-3 shadow-sm">
      <p className="text text--md text--bold m-0">{comment.author.username}</p>
      <small className="text text--grey text--sm">{comment.created_at}</small>
      <p className="text mt-3">{comment.text}</p>

      <p className="align-self-end text text--bold text--light-grey m-0">Ответить</p>
    </div>
  );
};
export default Comment;
