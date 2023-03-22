import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { convertToNumber } from "../../../utils/convertPrice";
import { IProductDetails } from "../../../app/types";
import i18n from "../../../i18n"

export interface ICartProduct extends IProductDetails {
  amount: number,
}

interface ICart {
  products: ICartProduct[],
  totalPrice: number;
}

const initialState: ICart = 
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "")
    : {products: [], totalPrice: 0}
;

const updateTotalPrice = (cartItem: ICartProduct[]) => {
  return cartItem.reduce((acc, current) => 
  acc + (current.amount * convertToNumber(current.price, i18n.language)), 0)
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartProduct>) {
      const isCartEmpty = state.products.length === 0
      const isProductInCart = state.products.some((product) => product.id === action.payload.id)

      if (isCartEmpty || !isProductInCart) {
        state.products.push(action.payload);
      }
      state.totalPrice = updateTotalPrice(state.products)
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart(state, action: PayloadAction<IProductDetails>) {
      state.products = state.products.filter((product) => product.id !== action.payload.id)
      state.totalPrice = updateTotalPrice(state.products)
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaseProductAmount(state, action: PayloadAction<IProductDetails>) {
      state.products = state.products.map(product => 
        product.id === action.payload.id ? 
        {...product, amount: product.amount + 1} : 
        product
        )
        state.totalPrice = updateTotalPrice(state.products)
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decreaseProductAmount(state, action: PayloadAction<IProductDetails>) {
      const currentProduct = state.products.find(product => product.id === action.payload.id)
      if (currentProduct && currentProduct.amount > 1) {
        state.products = state.products.map(product => 
          product.id === action.payload.id ? 
          {...product, amount: product.amount - 1} : 
          product
          )
          state.totalPrice = updateTotalPrice(state.products)
        localStorage.setItem("cart", JSON.stringify(state));
      } 
    },
    updateProductPrice(state, action: PayloadAction<IProductDetails>) {
      state.products = state.products.map(product => 
        product.id === action.payload.id ? 
        {...product, price: action.payload.price} : 
        product
        )
        state.totalPrice = updateTotalPrice(state.products)
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseProductAmount, 
  decreaseProductAmount, 
  updateProductPrice 
} = cartSlice.actions;
export default cartSlice.reducer;
