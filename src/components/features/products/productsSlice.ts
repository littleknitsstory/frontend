import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../app/types";

interface Products {
  favorite: IProduct[];
}

const initialState: Products = {
  favorite: localStorage.getItem("favoriteProducts")
    ? JSON.parse(localStorage.getItem("favoriteProducts") || "")
    : [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<IProduct>) {
      if (state.favorite.length === 0) {
        state.favorite.push(action.payload);
      }
      if (state.favorite.every((product) => product.id !== action.payload.id)) {
        state.favorite.push(action.payload);
      }
      localStorage.setItem("favoriteProducts", JSON.stringify(state.favorite));
    },
    removeFavorite(state, action: PayloadAction<IProduct>) {
      state.favorite = state.favorite.filter((product) => product.id !== action.payload.id);
      localStorage.setItem("favoriteProducts", JSON.stringify(state.favorite));
    },
  },
});

export const { addFavorite, removeFavorite } = productsSlice.actions;
export default productsSlice.reducer;
