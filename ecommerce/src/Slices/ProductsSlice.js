import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ===============================
   FETCH PRODUCTS (ASYNC THUNK)
================================ */

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      // Return only products array
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ===============================
   PRODUCT SLICE
================================ */

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Fulfilled
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      // Rejected
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productSlice.reducer;