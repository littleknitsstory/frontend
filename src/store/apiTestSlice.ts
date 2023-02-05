import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk, RootState} from './store'
import {CategoriesType, ReviewsType} from '../mainTypes'
import {getCategories, getReviews} from "../api/api";

export interface ApiTest {
  testWindow: boolean
  categories: CategoriesType
  reviews: ReviewsType
}

const initialState: ApiTest = {
  testWindow: false,
  categories: [],
  reviews: []
}

export const apiTestSlice = createSlice({
  name: 'apiTest',
  initialState,
  reducers: {
    setTestWindow: (state, action: PayloadAction<boolean>) => {
      state.testWindow = action.payload
    },
    setCategories: (state, action: PayloadAction<CategoriesType>) => {
      state.categories = action.payload
    },
    setReviews: (state, action: PayloadAction<ReviewsType>) => {
      state.reviews= action.payload
    }
  },
})

export const {setCategories, setTestWindow, setReviews} = apiTestSlice.actions

export const selectCategories = (state: RootState) => state.apiTest.categories
export const selectReviews = (state: RootState) => state.apiTest.reviews
export const selectTestWindow = (state: RootState) => state.apiTest.testWindow

export const getCategoriesThunk = (): AppThunk => async (dispatch) => {
  const categories = await getCategories()
  dispatch(setCategories(categories))
}

export const getReviewsThunk = (): AppThunk => async (dispatch) => {
  const reviews = await getReviews()
  dispatch(setReviews(reviews))
}

export default apiTestSlice.reducer