"use client";

import { ICommentsData, IFeaturesFlags } from "@/services/types";
import CardComment from "./CardComment";

import arrowLeftSVG from "@/assets/icons/arrow-left-nd.svg";
import arrowRightSVG from "@/assets/icons/arrow-right-nd.svg";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  comments: ICommentsData[];
  features: IFeaturesFlags;
  dictionary: IDictionary;
}

interface IDictionary {
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

const CommentsList = ({ features, comments, dictionary }: Props) => {
  const [message, setMessage] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://dev.backend.littleknitsstory.com:26363/api/v1/comments/",
        {
          method: "POST",
          body: JSON.stringify(message),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.dismiss();
      if (!response.ok) {
        const error = await response.json();
        toast.error(dictionary.comments.noAuthorize);
      } else {
        toast.success(dictionary.comments.successSend);
      }
    } catch (error) {
      toast.error(dictionary.notification.somethingWrong);
    }
  };

  return (
    <>
      {features.comments && (
        <div className="container-lg">
          <form className=" d-flex flex-column mt-5 col-md-8 col-lg-6 mx-0">
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
            {comments.map((comment) => (
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
      )}
    </>
  );
};

export default CommentsList;
