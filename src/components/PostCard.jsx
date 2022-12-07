import React from "react";
import { Link } from "react-router-dom";
import useLksService from "../assests/api";

const PostCard = ({ slug, created_at, title, readMore, image_preview }) => {
  const { _apiPictures } = useLksService();
  return (
    <div className="col-4 post" key={title}>
      <div className="lks-card post-card ">
        <div className="post-info">
          <ul>
            <Link
              to={`/posts/${slug}`}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <li>
                <div className="post-date">{created_at}</div>
                <div className="post-image">
                  <img src={`${_apiPictures}${image_preview}`} alt="img post" />
                </div>
                <div className="post-caption">{title}</div>

                <article className="post-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet aliquam nulla recusandae hic. Delectus sit omnis
                  officia minus aliquam iure reprehenderit quaerat,
                  architecto...
                </article>
                <div className={readMore}>
                  <button className="lks-btn lks-btn-main">Читать</button>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
