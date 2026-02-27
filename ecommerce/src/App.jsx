import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductsUi from "./Ui/ProductsUi";
import CartUi from "./Ui/CartUi";
import WishlistUi from "./Ui/WishlistUi";
import AuthUi from "./Ui/AuthUi";
import ProfileUi from "./Ui/ProfileUi";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<AuthUi />} />

        {/* Products */}
        <Route path="/products" element={<ProductsUi />} />
        <Route path="/cart" element={<CartUi />} />
        <Route path="/wishlist" element={<WishlistUi />} />
        <Route path="/profile" element={<ProfileUi />} />

        {/* If wrong route */}
        <Route path="/" element={<AuthUi />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;