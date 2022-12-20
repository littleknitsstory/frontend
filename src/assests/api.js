import { useHttp } from "./http.hook";

const useLksService = () => {
  const { request, error, setError, loaded, setLoaded } = useHttp();
  let apiBase = "";
  const apiPictures = "http://dev.backend.littleknitsstory.com:26363";

  if (process.env.NODE_ENV !== "production") {
    apiBase = "http://dev.backend.littleknitsstory.com:26363/api/v1/";
  } else {
    apiBase = "http://backend.littleknitsstory.com:26363/api/v1/";
  }

  const getMenu = async () => {
    const res = await request(`${apiBase}menu`);
    return res;
  };

  const getPosts = async (offset) => {
    const res = await request(`${apiBase}posts/?limit=6&offset=${offset}`);
    return res;
  };

  const getAllPosts = async () => {
    const res = await request(`${apiBase}posts`);
    return res;
  };

  const getPost = async (slug) => {
    const res = await request(`${apiBase}posts/${slug}/`);
    return res;
  };

  const getSliders = async () => {
    const res = await request(`${apiBase}sliders`);
    return res;
  };

  const getProducts = async (limit, offset) => {
    const res = await request(
      `${apiBase}products/?limit=${limit}&offset=${offset}`
    );
    return res;
  };

  const getProduct = async (slug) => {
    const res = await request(`${apiBase}products/${slug}/`);
    return res;
  };

  const getCategories = async () => {
    const res = await request(`${apiBase}categories`);
    return res;
  };

  const getCategory = async (slug) => {
    const res = await request(`${apiBase}categories/${slug}/`);
    return res;
  };

  return {
    loaded,
    setLoaded,
    getMenu,
    error,
    setError,
    getPosts,
    getSliders,
    apiPictures,
    getProducts,
    getCategories,
    getProduct,
    getPost,
    getCategory,
    getAllPosts,
  };
};

export default useLksService;
