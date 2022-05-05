import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  total: 0,
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      state.cartCount += 1;
    },
    reset: state => {
      state.products = [];
      state.cartCount = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
