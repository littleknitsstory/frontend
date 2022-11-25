import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLksService from "../assests/api";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { getPosts, error } = useLksService();

  useEffect(() => {
    getPosts().then((data) => setPosts(data.results));
  }, []);

  return (
    <div className="lks-container">
      {error ? (
        <h3>Что-то пошло не так, данные не получены</h3>
      ) : (
        <div>
          <h3>Все посты</h3>
          {posts.map((post) => (
            <ul className="lks-container" key={post.title}>
              <li>
                <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                <div className="small.lks-date">{post.created_at}</div>
                <address className="author lks-author">{post.author}</address>
                <article
                  className="lks-paragraph"
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                ></article>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
