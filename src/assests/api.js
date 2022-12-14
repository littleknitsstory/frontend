import { useHttp } from "./http.hook";

const useLksService = () => {
  const { request, error, setError, loaded, setLoaded } = useHttp();
  const _apiBase = "http://dev.backend.littleknitsstory.com:26363/api/v1/";
  const _apiPictures = "http://dev.backend.littleknitsstory.com:26363";

  const getMenu = async () => {
    const res = await request(`${_apiBase}menu`);
    return res;
  };

  const getPosts = async (offset) => {
    const res = await request(`${_apiBase}posts/?limit=6&offset=${offset}`);
    return res;
  };

  const getAllPosts = async () => {
    const res = await request(`${_apiBase}posts`);
    return res;
  };

  const getPost = async (slug) => {
    const res = await request(`${_apiBase}posts/${slug}/`);
    return res;
  };

  const getSliders = async () => {
    const res = await request(`${_apiBase}sliders`);
    return res;
  };

  const getProducts = async (limit, offset) => {
    const res = await request(
      `${_apiBase}products/?limit=${limit}&offset=${offset}`
    );
    return res;
  };

  const getProduct = async (slug) => {
    const res = await request(`${_apiBase}products/${slug}/`);
    return res;
  };

  const getCategories = async () => {
    const res = await request(`${_apiBase}categories`);
    return res;
  };

  const getCategory = async (slug) => {
    const res = await request(`${_apiBase}categories/${slug}/`);
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
    _apiPictures,
    getProducts,
    getCategories,
    getProduct,
    getPost,
    getCategory,
    getAllPosts,
  };
};

export default useLksService;
