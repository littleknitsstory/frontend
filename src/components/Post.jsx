import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLksService from "../assests/api";
import Spinner from "./Spinner";

const Post = () => {
  const [post, setPost] = useState([]);
  const { error, getPost, _apiPictures, loaded } = useLksService();

  const { slug } = useParams();

  useEffect(() => {
    getPost(slug).then((data) => setPost(data));
  }, [slug]);

  return (
    <div className="lks-container">
      {error || !loaded ? (
        <Spinner />
      ) : (
        <ul>
          <li>
            {post.title}
            {post.created_at}

            <img src={`${_apiPictures}${post.image_preview}`}></img>
            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            ></div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Post;
