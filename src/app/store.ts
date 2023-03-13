import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../components/features/api/apiSlice";
import { featuresSlice } from "../components/features/api/featuresSlice";
import productReducer from "../components/features/products/productsSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [featuresSlice.reducerPath]: featuresSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, featuresSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
