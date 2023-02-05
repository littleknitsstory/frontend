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

