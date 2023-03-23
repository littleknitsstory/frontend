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
  tags: {slug: string, title: string}[]
}

export interface IArticlesResponse {
  count: number;
  next: string;
  previous: string;
  results: IArticle[];
}

export interface IReviewsResponse {
  title: string;
  author: string;
  comment: string;
  rating: number;
  image_preview: string;
}

export interface FormValues {
  [key: string]: string
}

export interface IUserData {
  username: string;
  avatar: "";
  first_name: string;
  last_name: string;
  birth_data: string;
  country: string;
  city: string;
  address: string;
  email: string;
  is_email_confirmed: boolean;
  is_profile_full: boolean;
  phone_number: string;
  vk_profile: string;
  fb_profile: string;
  inst_profile: string;
  tg_profile: string
}

export interface ISignIn {
  username: string;
  email: string;
  password: string;
}
export interface ISignUp {
  email: string;
  password: string;
}
