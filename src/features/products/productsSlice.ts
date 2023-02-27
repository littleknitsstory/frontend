import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../app/models"

interface Products {
  favorite: IProduct[];
  cart: IProduct[];
}

const initialState: Products = {
  favorite: [],
  cart: []
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<IProduct>) {
      if (state.favorite.length === 0) {
        state.favorite.push(action.payload)
      } 
      if (state.favorite.every(product => product.id !== action.payload.id)) {
        state.favorite.push(action.payload)
      } 
    },
    removeFavorite(state, action: PayloadAction<IProduct>) {
      state.favorite = [...state.favorite.filter(product => product.id !== action.payload.id)]
    },
    addToCart(state, action: PayloadAction<IProduct>) {
      if (state.cart.length === 0) {
        state.cart.push(action.payload)
      } 
      if (state.cart.every(product => product.id !== action.payload.id)) {
        state.cart.push(action.payload)
      } 
    },
    removeFromCart(state, action: PayloadAction<IProduct>) {
      state.cart = [...state.cart.filter(product => product.id !== action.payload.id)]
    }
  }
})

export const { addFavorite, removeFavorite, addToCart, removeFromCart } = productsSlice.actions
export default productsSlice.reducer