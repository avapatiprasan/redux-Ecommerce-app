import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromWishlist } from "../Slices/WishlistSlice";
import "./WishlistUi.css";

const WishlistUi = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="wishlist-wrapper">

      {/* 🔙 Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </button>

      <h1 className="wishlist-title">My Wishlist</h1>

      <div className="wishlist-grid">
        {wishlist.length === 0 ? (
          <h2 className="empty-msg">Your Wishlist is Empty</h2>
        ) : (
          wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <h3 className="wishlist-item-title">{item.title}</h3>

              {item.images && (
                <img
                  src={item.images}
                  alt={item.title}
                  className="wishlist-image"
                />
              )}

              {/* ❌ Remove Button */}
              <button
                className="remove-btn"
                onClick={() => dispatch(removeFromWishlist(item.id))}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default WishlistUi;