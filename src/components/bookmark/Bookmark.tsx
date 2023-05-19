interface IBookmarks {
  slugPost: string;
}
const Bookmark = ({ slugPost }: IBookmarks) => {
  return <h2>bookmark</h2>;
};

export default Bookmark;
