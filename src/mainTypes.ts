export type CategoryType = {
  title: string
  slug: string
}
export type CategoriesType = Array<CategoryType>

export type ReviewType = {
  title: string
  author: string
  comment: string
  rating: number
  image_preview: string
}
export type ReviewsType = Array<ReviewType>

export type ProductType = {
  id: number
  code: number
  title: string
  slug: string
  description: string
  price: string
  sale: string
  colors: Array<string>,
  categories: CategoriesType
  author: number
  image_preview: string
  image_alt: string
}
export type ProductResultsType= Array<ProductType>

export type ProductsType = {
  count: number
  next: null | string
  previous: null | string
  results: ProductResultsType
}

  
