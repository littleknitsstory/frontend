import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticle } from "../../../app/types";


const initialState: {posts: IArticle[]} = {
  posts: localStorage.getItem("posts")
    ? JSON.parse(localStorage.getItem("posts") || '{posts: ""}')
    : []
}
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addToSavedPost(state, action: PayloadAction<IArticle>) {
      if (state.posts.length === 0) {
        state.posts.push(action.payload);
      }
      if (state.posts.every((product) => product.slug !== action.payload.slug)) {
        state.posts.push(action.payload);
      }
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    removeSavedPost(state, action: PayloadAction<IArticle>) {
      state.posts = [...state.posts.filter((post) => post.slug !== action.payload.slug)];
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
  },
});

export const { addToSavedPost, removeSavedPost } = postsSlice.actions;
export default postsSlice.reducer;
