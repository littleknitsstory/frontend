import { configureStore } from "@reduxjs/toolkit";

import { productsAPI } from "../services";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
