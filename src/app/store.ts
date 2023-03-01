import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '../features/api/apiSlice'
import productReducer from "../features/products/productsSlice"

const store = configureStore({
  reducer: {
    products: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

