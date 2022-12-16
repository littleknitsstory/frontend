import React from "react";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";
import useLksService from "../assests/api";
import Spinner from "./Spinner";
import Posts from "./Posts";

const Blog = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const { getPosts, error, loaded, _apiPictures } = useLksService();

  const [offset, setOffset] = useState(0);
  const [newPostLoading, setNewPostLoading] = useState(true);
  const [postEnded, setPostEnded] = useState(false);

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewPostLoading(false) : setNewPostLoading(true);
    getPosts(offset).then((data) => onPostLoaded(data.results));
  };

  const onPostLoaded = (newPostList) => {
    let ended = false;
    if (newPostList.length < 6) {
      ended = true;
    }
    setPosts([...posts, ...newPostList]);
    setOffset((offset) => offset + 6);
    setNewPostLoading(false);
    setPostEnded(ended);
  };

  return (
    <div className="lks-container">
      <div className="row">
        <div className="col-12">
          {error || !loaded ? (
            <Spinner />
          ) : (
            <div className="blog">
              <div className="blog-wrapper">
                <Carousel variant="dark" fade>
                  {posts.map((post, index) => (
                    <Carousel.Item key={index}>
                      <div className="slider-wrapper">
                        <div className="slider-image">
                          {/* <img
                            src={`${_apiPictures}${post.image_preview}`}
                            alt=""
                          /> */}
                          <img
                            src="https://via.placeholder.com/180x200/300"
                            alt="placeholder"
                          />
                        </div>
                        <div className="slider-body">
                          <div className="post-caption">{post.title}</div>
                          <div className="post-date">{post.created_at}</div>
                          <p className="post-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Sequi maxime, labore sed quo laudantium
                            tempore quidem. Officiis laboriosam dolorum
                            doloribus perspiciatis mollitia? Delectus voluptate
                            cumque, quod nesciunt et velit necessitatibus!
                          </p>
                          <div className="post-author">
                            {t("Author: Kate Anaprienko")}
                          </div>
                        </div>
                      </div>
                      <div className="slider-button">
                        <Link to={`/posts/${post.slug}`}>
                          <button
                            className="lks-btn lks-btn-main"
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                          >
                            {t("Read")}
                          </button>
                        </Link>
                      </div>

                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <Posts
                posts={posts}
                offset={offset}
                onRequest={onRequest}
                newPostLoading={newPostLoading}
                postEnded={postEnded}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Blog);
