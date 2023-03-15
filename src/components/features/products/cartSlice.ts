import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { convertNumber } from "../../../utils/convertPrice";
import i18n from "../../../i18n"

export interface ICartProduct {
  id: number,
  slug: string,
  amount: number,
  code: number;
  price: string;
}

interface Cart {
  cart: ICartProduct[],
  totalPrice: number;
}

const initialState: Cart = 
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "")
    : {cart: [], totalPrice: 0}
;

const productsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartProduct>) {
      if (state.cart.length === 0) {
        state.cart.push(action.payload);
      }
      if (state.cart.every((product) => product.id !== action.payload.id)) {
        state.cart.push(action.payload);
      }
      
      state.totalPrice = state.cart.reduce((acc, current) => 
        acc + (current.amount * convertNumber(current.price, i18n.language)), 0)
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart(state, action: PayloadAction<ICartProduct>) {
      state.cart = [...state.cart.filter((product) => product.id !== action.payload.id)]
      state.totalPrice = state.cart.reduce((acc, current) => 
        acc + (current.amount * convertNumber(current.price, i18n.language)), 0)
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaseProductAmount(state, action: PayloadAction<ICartProduct>) {
      state.cart = state.cart.map(product => 
        product.id === action.payload.id ? 
        {...product, amount: product.amount + 1} : 
        product
        )
      state.totalPrice = state.cart.reduce((acc, current) => 
        acc + (current.amount * convertNumber(current.price, i18n.language)), 0)
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decreaseProductAmount(state, action: PayloadAction<ICartProduct>) {
      if (state.cart.find(product => product.id === action.payload.id)?.amount === 1) {
        
      } else {
        state.cart = state.cart.map(product => 
          product.id === action.payload.id ? 
          {...product, amount: product.amount - 1} : 
          product
          )
        state.totalPrice = state.cart.reduce((acc, current) =>
          acc + (current.amount * convertNumber(current.price, i18n.language)), 0)
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    updatePrice(state, action: PayloadAction<ICartProduct>) {
      state.cart = state.cart.map(product => 
        product.id === action.payload.id ? 
        {...product, price: action.payload.price} : 
        product
        )
      state.totalPrice = state.cart.reduce((acc, current) => 
        acc + (current.amount * convertNumber(current.price, i18n.language)), 0)
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, increaseProductAmount, decreaseProductAmount, updatePrice } = productsSlice.actions;
export default productsSlice.reducer;
