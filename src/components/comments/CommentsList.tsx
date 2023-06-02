"use client";
import useSWR from "swr";

import { ChangeEvent, useState } from "react";
import { CommentsData, FeaturesFlags } from "@/services/types";
import { ENDPOINTS } from "@/services/constants";
import CardComment from "./CardComment";
import { toast } from "react-toastify";
import { getComments } from "@/services/api-client";
import Spinner from "../utils/Spinner";

interface Props {
  // comments: CommentsData[];
  dictionary: Dictionary;
}

interface Dictionary {
  comments: {
    send: string;
    comments: string;
    noAuthorize: string;
    successSend: string;
    reply: string;
    placeholderComments: string;
  };
  notification: {
    somethingWrong: string;
  };
}

export default function CommentsList({ dictionary }: Props) {
  const [message, setMessage] = useState<string>("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: comments,
    error,
    isLoading,
  } = useSWR<CommentsData[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${ENDPOINTS.COMMENTS}?model_type=ARTICLE`,
    fetcher
  );

  console.log(comments);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${ENDPOINTS.COMMENTS}`,
        {
          method: "POST",
          body: JSON.stringify(message),
        }
      );
      toast.dismiss();
      if (!response.ok) {
        if (response.status === 401) {
          toast.error(dictionary.comments.noAuthorize);
        } else {
          toast.error(dictionary.notification.somethingWrong);
        }
      } else {
        toast.success(dictionary.comments.successSend);
      }
    } catch (error) {
      toast.error(dictionary.notification.somethingWrong);
    }
  };

  return (
    <>
      <div className="container-lg">
        <form className="d-flex flex-column mt-5 col-md-8 col-lg-6 mx-0">
          <h4 className="text text--md text--bold">
            {dictionary.comments.comments}
          </h4>
          <textarea
            name="postContent"
            rows={5}
            value={message}
            onChange={(e) => handleChange(e)}
            placeholder={dictionary.comments.placeholderComments}
            className="w-100 rounded-4 p-3"
          />
          <button
            className="btn btn-primary mt-3 d-sm-block align-self-sm-end"
            disabled={message.length === 0}
            onClick={(e: React.FormEvent) => handleSubmit(e)}
          >
            {dictionary.comments.send}
          </button>
        </form>
        <div className="mt-5 col-md-8 col-lg-6 mx-0">
          {isLoading && <Spinner />}
          {error && (
            <p className="text text--burgundy text-center">
              Cannot load comments
            </p>
          )}
          {comments?.map((comment) => (
            <CardComment
              key={comment.id}
              comment={comment}
              dictionary={dictionary}
            />
          ))}
          <div className="d-flex gap-1 justify-content-evenly align-items-center text text--md mx-auto"></div>
        </div>
        <div className="post__comments--buttons"></div>
      </div>
    </>
  );
}
