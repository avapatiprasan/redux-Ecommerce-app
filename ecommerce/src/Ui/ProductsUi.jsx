import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Slices/ProductsSlice";
import { addToCart } from "../Slices/CartSlice";
import { addToWishList } from "../Slices/WishlistSlice";
import { logout } from "../Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { Toaster, toast } from "react-hot-toast";
import "./ProductsUi.css";

const ProductsUi = () => {
  const { products } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Search State

  // 🔐 Protect products page
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`);
  };

  const handlewishList = (item) => {
    dispatch(addToWishList(item));
    toast.success(`${item.title} added to wishlist`);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  // ✅ Filter Products Based On Search
  const filteredProducts = products?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`products-wrapper ${darkMode ? "dark" : ""}`}>
      <Toaster position="top-right" />

      <section className="hero-section">
        <div className="hero-content">
          <h1>Premium Quality Products</h1>

          {/* ✅ SEARCH BAR */}
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="dark-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </section>

      <div className="middle-nav">
        <button onClick={() => navigate("/cart")}>
          🛒 Cart ({cart.length})
        </button>

        <button onClick={() => navigate("/wishlist")}>
          ❤️ Wishlist
        </button>

        <button onClick={() => navigate("/profile")}>
          👤 Profile
        </button>

        <button onClick={handleLogout} className="logout-btn">
          🚪 Logout
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="image-container">
                <img src={item.thumbnail} alt={item.title} />

                <button
                  className="wishlist-btn"
                  onClick={() => handlewishList(item)}
                >
                  <CiHeart size={18} />
                </button>
              </div>

              <div className="product-info">
                <h3>{item.title}</h3>
                <p className="price">₹ {item.price}</p>

                <button
                  className="cart-btn"
                  onClick={() => handleCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="no-results">No products found</h2>
        )}
      </div>
    </div>
  );
};

export default ProductsUi;