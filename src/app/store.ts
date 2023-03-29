import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../components/features/api/apiSlice";
import productReducer from "../components/features/products/productsSlice";
import postsSliceReducer from "../components/features/posts/postsSlice";
import cartSliceReducer from "../components/features/products/cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    posts: postsSliceReducer,
    cart: cartSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
