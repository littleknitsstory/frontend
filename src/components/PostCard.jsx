import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ slug, created_at, title }) => {
  return (
    <div className="col-4 post" key={title}>
      <div className="lks-card post-card">
        <div className="post-info">
          <ul>
            <Link to={`/posts/${slug}`}>
              <li>
                <div className="post-date">{created_at}</div>
                <div className="post-image">
                  <img
                    // src={`${_apiPictures}${post.image_preview}`}
                    src="https://bipbap.ru/wp-content/uploads/2019/05/86ae0b2400c92d333751c8d9a9ae68e4.png"
                    alt="img post"
                  />
                </div>
                <div className="post-caption">{title}</div>

                <article className="post-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet aliquam nulla recusandae hic. Delectus sit omnis
                  officia minus aliquam iure reprehenderit quaerat,
                  architecto...
                </article>
                <div className="read-more">
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
