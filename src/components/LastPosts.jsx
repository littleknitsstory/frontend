import React from "react";
import AuthorCard from "./AuthorCard";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import useLksService from "../assests/api";
import PostCard from "./PostCard";
import Spinner from "./Spinner";

const LastPosts = () => {
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
            <div className="lastPosts__subtitle">Последние посты</div>

            <AuthorCard />
            <div className="col-9 blog">
              {error || !loaded ? (
                <Spinner />
              ) : (
                <Carousel variant="dark">
                  {posts.map((post) => (
                    <Carousel.Item key={post.title}>
                      <PostCard
                        title={post.title}
                        created_at={post.created_at}
                        slug={post.slug}
                        readMore="read-more-none"
                      />

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

export default LastPosts;
