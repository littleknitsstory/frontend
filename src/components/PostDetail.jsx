import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLksService from "../assests/api";
import Spinner from "./Spinner";
import PostCard from "./PostCard";

const PostDetail = () => {
  const [post, setPost] = useState([]);
  const { error, getPost, _apiPictures, loaded, getPosts } = useLksService();

  const { slug } = useParams();

  useEffect(() => {
    getPost(slug).then((data) => setPost(data));
  }, [slug]);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => setPosts(data.results));
  }, []);

  return (
    <div className="lks-container">
      {error || !loaded ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="post-detail">
              <div className="post-caption-detail">{post.title}</div>
              <div className="post-date-detail">{post.created_at}</div>
              <div className="post-author-detail">Катя Анаприенко</div>
              <div className="post-image-detail">
                <img
                  src={`${_apiPictures}${post.image_preview}`}
                  alt="img post"
                />
              </div>

              <article className="post-text-detail">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                temporibus dolore est commodi tempora repellendus sunt
                doloremque error ipsa? Neque laudantium inventore obcaecati
                quasi sint eius. Amet odit nihil quis! Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Incidunt reprehenderit
                eveniet beatae eum molestiae at repellat perspiciatis? Deleniti
                reprehenderit autem inventore eum error, quis enim odio culpa
                dolore iste ex. Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Temporibus aut perspiciatis odit. Cupiditate,
                unde. Aut enim deserunt rem sunt quam excepturi architecto,
                ducimus minus fuga soluta vitae ex aliquid ipsum.
              </article>
            </div>
            <div className="post-subtitle">Предложенные посты</div>
            <div className="posts">
              {posts.map((post) => (
                <PostCard
                  key={post.title}
                  title={post.title}
                  created_at={post.created_at}
                  slug={post.slug}
                  readMore="read-more"
                  image_preview={post.image_preview}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
