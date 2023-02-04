import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk, RootState} from './store'
import {CategoriesType} from '../mainTypes'
import {getCategories} from "../api/api";

export interface ApiTest {
  testWindow: boolean
  categories: CategoriesType
}

const initialState: ApiTest = {
  testWindow: false,
  categories: []
}

export const apiTestSlice = createSlice({
  name: 'apiTest',
  initialState,
  reducers: {
    setTestWindow: (state,action: PayloadAction<boolean>) => {
      state.testWindow = action.payload
    },
    setCategories: (state, action: PayloadAction<CategoriesType>) => {
      state.categories = action.payload
    }
  },
})

export const {setCategories,setTestWindow} = apiTestSlice.actions

export const selectCategories = (state: RootState) => state.apiTest.categories
export const selectTestWindow = (state: RootState) => state.apiTest.testWindow

export const getCategoriesThunk = (): AppThunk => async (dispatch) => {
  const categories = await getCategories()
  dispatch(setCategories(categories))
}

export default apiTestSlice.reducer