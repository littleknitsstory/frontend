import {CategoriesType, ProductsType, ReviewsType} from "../mainTypes";

const baseUrl = 'http://dev.backend.littleknitsstory.com:26363/api/v1/'
const data = <T extends object>(res: Response): Promise<T> => res.json()
export const api = (url: string, init?: RequestInit) => fetch(new URL(url, baseUrl), init)
export const getCategories = () => api('categories').then(data<CategoriesType>)
export const getReviews = () => api('reviews').then(data<ReviewsType>)
export const getProducts = () => api('products/?limit=10&offset=0').then(data<ProductsType>)
