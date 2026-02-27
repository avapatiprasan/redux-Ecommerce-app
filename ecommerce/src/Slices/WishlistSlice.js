import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const existingItem = state.wishlist.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.wishlist.push(action.payload);
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToWishList, removeFromWishlist } =
  WishlistSlice.actions;

export default WishlistSlice.reducer;