import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/services/features/api/apiSlice";
import postsSliceReducer from "@/services/redux/posts/postsSlice";

const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
