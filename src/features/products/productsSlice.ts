import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../app/types"

interface Products {
  favorite: IProduct[];
  cart: IProduct[];
}

const initialState: Products = {
  favorite: localStorage.getItem("favoriteProducts") ? JSON.parse(localStorage.getItem("favoriteProducts") || "") : [],
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") || "") : [],
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
      localStorage.setItem("favoriteProducts", JSON.stringify(state.favorite))
    },
    removeFavorite(state, action: PayloadAction<IProduct>) {
      state.favorite = [...state.favorite.filter(product => product.id !== action.payload.id)]
      localStorage.setItem("favoriteProducts", JSON.stringify(state.favorite))
    },
    addToCart(state, action: PayloadAction<IProduct>) {
      if (state.cart.length === 0) {
        state.cart.push(action.payload)
      } 
      if (state.cart.every(product => product.id !== action.payload.id)) {
        state.cart.push(action.payload)
      }
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    removeFromCart(state, action: PayloadAction<IProduct>) {
      state.cart = [...state.cart.filter(product => product.id !== action.payload.id)]
      localStorage.setItem("cart", JSON.stringify(state.cart))
    }
  }
})

export const { addFavorite, removeFavorite, addToCart, removeFromCart } = productsSlice.actions
export default productsSlice.reducer