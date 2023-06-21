export interface Product {
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

export interface ProductsResponse {
  count: number;
  next: string;
  previous: string;
  results: Product[];
}

export interface ProductDetails {
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

export interface MenuResponse {
  count: number;
  next: string;
  previous: string;
  results: Menu[];
}

export interface Menu {
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

export interface ContactRequest {
  name?: string;
  email: string;
  message: string;
  phone_number?: string;
  company?: string;
}

export interface Articles {
  title: string;
  slug: string;
  description: string;
  contents: [
    {
      text: string;
      image: string;
      image_alt: string;
    }
  ];
  author: null;
  tags: [
    {
      title: string;
      slug: string;
    }
  ];
  created_at: string;
}

export interface Article {
  title: string;
  slug: string;
  description: string;
  contents: {
    text: string;
    image: string;
    image_alt: string;
  }[];
  is_active: boolean;
  author: {
    id: number;
    username: string;
    avatar: string;
    first_name: string;
    last_name: string;
  };
  tags: { slug: string; title: string }[];
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
  is_bookmarked: string;
}

export interface ReviewsResponse {
  title: string;
  author: string;
  comment: string;
  rating: number;
  image_preview: string;
}

export interface FormValues {
  [key: string]: string;
}

export interface UserData {
  username: string;
  avatar: string;
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
  tg_profile: string;
}

export interface SignIn {
  username: string;
  email: string;
  password: string;
}
export interface SignUp {
  email: string;
  password: string;
}

export interface CommentsData {
  id: number;
  author: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
  text: string;
  created_at: string;
}

export interface FeaturesFlags {
  menu: boolean;
  articles: boolean;
  blog: boolean;
  shop: boolean;
  slider: boolean;
  account: boolean;
  comments: boolean;
  contacts: boolean;
}
