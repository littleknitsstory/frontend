import { configureStore } from "@reduxjs/toolkit";
import savedProducts from "./savedProductSlice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    savedProducts,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
