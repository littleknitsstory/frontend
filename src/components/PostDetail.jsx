import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";
import useLksService from "../assests/api";
import Spinner from "./Spinner";
import PostCard from "./PostCard";
import img_post from "../assests/images/img_post.png";

const PostDetail = () => {
  const { t } = useTranslation();
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
              <div className="post-author-detail">
                {t("Author: Kate Anaprienko")}
              </div>
              <div className="post-image-detail">
                {/* <img
                  src={`${_apiPictures}${post.image_preview}`}
                  alt="img post"
                /> */}
                <img src={img_post} alt="placeholder" />
              </div>

              <article
                className="post-text-detail"
                // dangerouslySetInnerHTML={{
                //   __html: post.content,
                // }}
              >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Assumenda voluptatibus dolor laudantium quibusdam officiis totam
                voluptatum consectetur aliquam vero nesciunt debitis facere
                inventore commodi fugit, quas fugiat reprehenderit! Quod, et.
              </article>
            </div>
            <div className="post-subtitle">{t("Suggested Posts")}</div>
            <div className="posts">
              {posts.map((post, index) => (
                <PostCard
                  key={index}
                  title={post.title}
                  created_at={post.created_at}
                  slug={post.slug}
                  readMore="read-more"
                  image_preview={post.image_preview}
                  content={post.content}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withTranslation()(PostDetail);
