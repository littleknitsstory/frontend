import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk, RootState} from './store'
import {CategoriesType, ProductResultsType, ReviewsType} from '../mainTypes'
import {getCategories, getProducts, getReviews} from "../api/api";

export interface ApiTest {
  categories: CategoriesType
  reviews: ReviewsType
  products: ProductResultsType
}

const initialState: ApiTest = {
  categories: [],
  reviews: [],
  products: []
}

export const apiTestSlice = createSlice({
  name: 'apiTest',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoriesType>) => {
      state.categories = action.payload
    },
    setReviews: (state, action: PayloadAction<ReviewsType>) => {
      state.reviews= action.payload
    },
    setProducts: (state, action: PayloadAction<ProductResultsType>) => {
      state.products= action.payload
    }
  },
})

export const {setCategories, setReviews, setProducts} = apiTestSlice.actions

export const selectCategories = (state: RootState) => state.apiTest.categories
export const selectReviews = (state: RootState) => state.apiTest.reviews
export const selectProducts = (state: RootState) => state.apiTest.products

export const getCategoriesThunk = (): AppThunk => async (dispatch) => {
  const categories = await getCategories()
  dispatch(setCategories(categories))
}

export const getReviewsThunk = (): AppThunk => async (dispatch) => {
  const reviews = await getReviews()
  dispatch(setReviews(reviews))
}

export const getProductsThunk = (): AppThunk => async (dispatch) => {
  const data = await getProducts()
  dispatch(setProducts(data.results))
}

export default apiTestSlice.reducer