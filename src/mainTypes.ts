export type PopUpType = {
  id: number
  jsxData: JSX.Element
}
export type AddJsxFunc = (id: number) => JSX.Element

export type CategoryType = {
  title: string
  slug: string
}
export type CategoriesType = Array<CategoryType>


