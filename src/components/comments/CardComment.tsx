"use client";

import { CommentsData } from "@/services/types";

interface Props {
  comment: CommentsData;
  dictionary: Dictionary;
}

interface Dictionary {
  comments: {
    reply: string;
  };
}

const Comment = ({ comment, dictionary }: Props) => {
  return (
    <div className="d-flex flex-column mb-4 rounded-4 py-2 px-3 shadow-sm">
      <p className="text text--md text--bold m-0">{comment.author.username}</p>
      <small className="text text--grey text--sm">{comment.created_at}</small>
      <p className="text mt-3">{comment.text}</p>

      {/* <button className="btn btn--transparent align-self-end p-0 m-0" onClick={handleDeleteComment}>
        ⛔️
      </button> */}
      <p className="align-self-end text text--bold text--light-grey m-0">
        {dictionary.comments.reply}
      </p>
    </div>
  );
};
export default Comment;
