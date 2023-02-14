import apiClient from "./apiClient";
import {
  IContactRequest,
  IProductDetails,
  IProductsResponse,
  IArticlesResponse,
  IArticle,
} from "./models";

enum URLS {
  PRODCTS = "api/v1/products/",
  CONTACTS = "api/v1/contacts/",
  ARTICLES = "/api/v1/posts/",
}

export const PICTURE_BASE_URL = "http://dev.backend.littleknitsstory.com:26363";

export const getProducts = async (offset: number, limit: number) => {
  try {
    const response = await apiClient.get(
      `${URLS.PRODCTS}?offset=${offset}&limit=${limit}`
    );
    if (response.ok) {
      const data: IProductsResponse = await response.json();
      return {
        ...data,
        results: data.results.map((item) => ({
          ...item,
          image_preview: `${PICTURE_BASE_URL}${item.image_preview}`,
        })),
      } as IProductsResponse;
    }
    throw new Error("Something went wrong");
  } catch (error) {}
};

export const getProductDetails = async (slug: string) => {
  try {
    const response = await apiClient.get(`${URLS.PRODCTS}/${slug}`);
    if (response.ok) {
      const data: IProductDetails = await response.json();
      return {
        ...data,
        image_preview: `${PICTURE_BASE_URL}${data.image_preview}`,
      } as IProductDetails;
    }
    throw new Error("Something went wrong");
  } catch (error) {}
};

export const postContactRequest = async ({
  email,
  message,
  company,
  name,
  phone_number,
}: IContactRequest): Promise<boolean> => {
  try {
    const response = await apiClient.post(`${URLS.CONTACTS}`, {
      email,
      message,
      company,
      name,
      phone_number,
    });
    if (response.ok) {
      return true;
    }
    throw new Error("Something went wrong");
  } catch (error) {
    return false;
  }
};

export const getArticles = async (offset: number, limit: number) => {
  try {
    const response = await apiClient.get(
      `${URLS.ARTICLES}?offset=${offset}&limit=${limit}`
    );
    if (response.ok) {
      const data: IArticlesResponse = await response.json();
      return {
        ...data,
        results: data.results.map((item) => ({
          ...item,
          image_preview: `${PICTURE_BASE_URL}${item.image_preview}`,
        })),
      } as IArticlesResponse;
    }
    throw new Error("Something went wrong");
  } catch (error) {}
};

export const getArticleDetails = async (slug: string) => {
  try {
    const response = await apiClient.get(`${URLS.ARTICLES}/${slug}`);
    if (response.ok) {
      const data: IArticle = await response.json();
      return {
        ...data,
        image_preview: `${PICTURE_BASE_URL}${data.image_preview}`,
      } as IArticle;
    }
    throw new Error("Something went wrong");
  } catch (error) {}
};
