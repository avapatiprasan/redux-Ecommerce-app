import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../Slices/CartSlice";

const CartUi = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "30px" }}>
      
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/products")}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        ← Back to Products
      </button>

      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              width: "300px",
              borderRadius: "8px",
            }}
          >
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>

            {item.images && (
              <img
                src={item.images}
                alt={item.title}
                width="120"
              />
            )}

            <br />

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              style={{
                marginTop: "10px",
                padding: "6px 12px",
                cursor: "pointer",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartUi;