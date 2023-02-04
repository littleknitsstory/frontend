import {CategoriesType} from "../mainTypes";

const baseUrl = 'http://dev.backend.littleknitsstory.com:26363/api/v1/'
const data = (res: Response) => res.json()
export const api = (url: string, init?: any) => fetch(new URL(url, baseUrl), init)
export const getCategories = (): Promise<CategoriesType> => api('categories').then(data)
