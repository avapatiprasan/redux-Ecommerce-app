import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: []
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );
    }
  }
});

// ✅ VERY IMPORTANT (Named Export)
export const { addToCart, removeFromCart } = CartSlice.actions;

// ✅ Default Export
export default CartSlice.reducer;