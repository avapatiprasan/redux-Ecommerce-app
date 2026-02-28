import { configureStore } from "@reduxjs/toolkit";

import ProductsReducer from "./Slices/ProductsSlice";
import CartReducer from "./Slices/CartSlice";
import WishListReducer from "./Slices/WishlistSlice";
import AuthReducer from "./Slices/AuthSlice";

const Store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: CartReducer,
    wishlist: WishListReducer,
    auth: AuthReducer,
  },

  // Enables Redux DevTools automatically
  devTools: process.env.NODE_ENV !== "production",

  // Default middleware (includes thunk)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;