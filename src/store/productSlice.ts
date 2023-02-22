import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IProduct {
  id: number;
  code: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  sale: string;
  colors: { color: string }[];
  categories: { title: string; slug: string }[];
  author: number;
  image_preview: string;
  image_alt: string;
}

export interface CounterState {
  products: IProduct[];
}

const initialState: CounterState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;

export default productSlice.reducer;
