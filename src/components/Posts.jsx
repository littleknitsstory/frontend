import React from "react";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";
import PostCard from "./PostCard";

const Posts = ({ posts, offset, onRequest, newPostLoading, postEnded }) => {
  const { t } = useTranslation();
  return (
    <div className="posts">
      {posts.map((post, index) => (
        <PostCard
          key={index}
          title={post.title}
          created_at={post.created_at}
          slug={post.slug}
          readMore="read-more"
          image_preview={post.image_preview}
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
        {t("See more")}
      </p>
    </div>
  );
};

export default withTranslation()(Posts);
