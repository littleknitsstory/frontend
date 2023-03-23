import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../components/features/api/apiSlice";
import productReducer from "../components/features/products/productsSlice";
import postsSlice from "../components/features/posts/postsSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    posts: postsSlice, 
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
