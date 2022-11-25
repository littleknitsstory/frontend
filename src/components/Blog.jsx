import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLksService from "../assests/api";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { getPosts, error } = useLksService();
  const [offset, setOffset] = useState(-4);
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
    if (newPostList.length < 4) {
      ended = true;
    }
    setPosts([...posts, ...newPostList]);
    setOffset((offset) => offset + 4);
    setNewPostLoading(false);
    setPostEnded(ended);
  };

  return (
    <div className="lks-container">
      {error ? (
        <h3>Что-то пошло не так, данные не получены</h3>
      ) : (
        <div>
          <h3>Все посты</h3>
          <button
            onClick={() => {
              onRequest(offset);
            }}
            disabled={newPostLoading}
            style={{ display: postEnded ? "none" : "block" }}
          >
            see more
          </button>
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
