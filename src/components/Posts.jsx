import React from "react";
import PostCard from "./PostCard";

const Posts = ({ posts, offset, onRequest, newPostLoading, postEnded }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard
          key={post.title}
          title={post.title}
          created_at={post.created_at}
          slug={post.slug}
        />
      ))}

      <p
        className="lks-see-more"
        onClick={() => {
          onRequest(offset);
        }}
        disabled={newPostLoading}
        style={{ display: postEnded ? "none" : "block" }}
      >
        Смотреть еще
      </p>
    </div>
  );
};

export default Posts;
