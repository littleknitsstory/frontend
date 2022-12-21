import React from "react";
import AuthorCard from "./AuthorCard";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";
import useLksService from "../assests/api";
import PostCard from "./PostCard";
import Spinner from "./Spinner";

const LastPosts = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const { getPosts, error, loaded } = useLksService();
  useEffect(() => {
    getPosts().then((data) => setPosts(data.results));
  }, []);

  return (
    <Container>
      <div className="lks-container">
        <div className="lastPosts">
          <div className="row">
            <div className="lastPosts__subtitle">{t("Last posts")}</div>

            <AuthorCard />
            <div className="col-9  blog">
              {error || !loaded ? (
                <Spinner />
              ) : (
                <Carousel variant="dark">
                  {posts.map((post, index) => (
                    <Carousel.Item key={index}>
                      <div className="two-posts">
                        <div className="posts-slider">
                          <PostCard
                            title={post.title}
                            created_at={post.created_at}
                            slug={post.slug}
                            image_preview={post.image_preview}
                            readMore="read-more-none"
                            content={post.content}
                          />

                          <PostCard
                            title={post.title}
                            created_at={post.created_at}
                            slug={post.slug}
                            image_preview={post.image_preview}
                            readMore="read-more-none"
                            content={post.content}
                          />
                        </div>
                      </div>

                      <div className="one-post">
                        <div className="posts-slider">
                          <PostCard
                            title={post.title}
                            created_at={post.created_at}
                            slug={post.slug}
                            image_preview={post.image_preview}
                            readMore="read-more-none"
                            content={post.content}
                          />
                        </div>
                      </div>

                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default withTranslation()(LastPosts);
