export interface IProduct {
  id: number;
  code: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  sale: string;
  colors: { color: string }[];
  categories: { title: string; slug: string }[];
  author: number;
  image_preview: string;
  image_alt: string;
}

export interface IProductsResponse {
  count: number;
  next: string;
  previous: string;
  results: IProduct[];
}

export interface IProductDetails {
  id: number;
  code: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  price_currency: string;
  sale: string;
  sale_currency: string;
  categories: {
    title: string;
    slug: string;
  }[];
  author: number;
  count: number;
  type_product: string;
  material: string;
  included: string;
  height: number;
  weight: number;
  colors: {
    color: string;
  }[];
  photo_product: {
    image_preview: string;
    image_alt: string;
  }[];
  image_preview: string;
  image_alt: string;
  title_seo: string;
  meta_keywords: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
}

export interface IMenuResponse {
  count: number;
  next: string;
  previous: string;
  results: IMenu[];
}

export interface IMenu {
  id: number;
  name: string;
  url: string;
  menu: {
    id: number;
    slug: string;
    hint: string;
  };
  target: string;
  parent: string;
  ordering: number;
  is_active: boolean;
}

export interface IContactRequest {
  name?: string;
  email: string;
  message: string;
  phone_number?: string;
  company?: string;
}

export interface IArticle {
  title: string;
  slug: string;
  content: string;
  author: number;
  image_preview: string;
  image_alt: string;
  created_at: string;
}

export interface IArticlesResponse {
  count: number;
  next: string;
  previous: string;
  results: IArticle[];
}

export interface ISavedProducts {
  savedProducts: IProduct[];
}
