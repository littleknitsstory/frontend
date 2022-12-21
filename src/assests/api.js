import { useHttp } from "./http.hook";

const useLksService = () => {
  const { request, error, setError, loaded, setLoaded } = useHttp();
  const apiPictures = "http://dev.backend.littleknitsstory.com:26363";

  const getMenu = async () => {
    const res = await request(`${process.env.REACT_APP_API_BASE}menu`);
    return res;
  };

  const getPosts = async (offset) => {
    const res = await request(
      `${process.env.REACT_APP_API_BASE}posts/?limit=6&offset=${offset}`
    );
    return res;
  };

  const getAllPosts = async () => {
    const res = await request(`${process.env.REACT_APP_API_BASE}posts`);
    return res;
  };

  const getPost = async (slug) => {
    const res = await request(
      `${process.env.REACT_APP_API_BASE}posts/${slug}/`
    );
    return res;
  };

  const getSliders = async () => {
    const res = await request(`${process.env.REACT_APP_API_BASE}sliders`);
    return res;
  };

  const getProducts = async (limit, offset) => {
    const res = await request(
      `${process.env.REACT_APP_API_BASE}products/?limit=${limit}&offset=${offset}`
    );
    return res;
  };

  const getProduct = async (slug) => {
    const res = await request(
      `${process.env.REACT_APP_API_BASE}products/${slug}/`
    );
    return res;
  };

  const getCategories = async () => {
    const res = await request(`${process.env.REACT_APP_API_BASE}categories`);
    return res;
  };

  const getCategory = async (slug) => {
    const res = await request(
      `${process.env.REACT_APP_API_BASE}categories/${slug}/`
    );
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
