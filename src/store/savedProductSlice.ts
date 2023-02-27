import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISavedProducts, IProduct, IProductDetails } from "../api/models";

const initialState: ISavedProducts = {
  savedProducts: [],
};

const savedProductsSlice = createSlice({
  name: "savedProducts",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IProduct | IProductDetails>) {
      if (state.savedProducts.every((item) => item.id !== action.payload.id)) {
        state.savedProducts.push(action.payload);
      }
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.savedProducts = state.savedProducts.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addProduct, removeProduct } = savedProductsSlice.actions;

export default savedProductsSlice.reducer;
