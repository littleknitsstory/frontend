import { useAppSelector } from "../../app/hooks";
import CardArticle from "./CardArticle";

const Bookmarks = () => {
  const bookmarks = useAppSelector((state) => state.posts.posts);

  return (
    <div className="bookmarks">
      <article className="posts__articles">
        {bookmarks?.map((post) => (
          <CardArticle key={post.slug} article={post} />
        ))}
      </article>
    </div>
  );
};
export default Bookmarks;
