import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ===============================
   LOGIN API
================================= */

export const loginApi = createAsyncThunk(
  "auth/loginApi",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      // Optional: Save token in localStorage
      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

/* ===============================
   AUTH SLICE
================================= */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },

  reducers: {
    // ✅ LOGOUT REDUCER (IMPORTANT)
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;

      // Remove token
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN PENDING
      .addCase(loginApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // LOGIN SUCCESS
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })

      // LOGIN FAILED
      .addCase(loginApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ===============================
   EXPORTS
================================= */

export const { logout } = authSlice.actions;
export default authSlice.reducer;