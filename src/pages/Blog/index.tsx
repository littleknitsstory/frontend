import Articles from "./Articles";
import MainSliderArticle from "../../components/blog/MainSliderArticle";
import { useGetFeaturesQuery } from "../../components/features/api/featuresSlice";

const Blog = () => {
  const { data } = useGetFeaturesQuery();
  return (
    <>
      {data?.slider ? <MainSliderArticle /> : null}
      {data?.blog ? <Articles /> : null}
    </>
  );
};
export default Blog;
