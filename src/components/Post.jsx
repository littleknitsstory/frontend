import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLksService from "../assests/api";

const Post = () => {
  const [post, setPost] = useState([]);
  const { error, getPost, _apiPictures } = useLksService();

  const { slug } = useParams();

  useEffect(() => {
    getPost(slug).then((data) => setPost(data));
  }, [slug]);

  return (
    <div className="lks-container">
      {error ? (
        <h3>Что-то пошло не так, данные не получены</h3>
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
