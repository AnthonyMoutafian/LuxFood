import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router";

export const Cart = ({setCartItems, cartItems, handleRemoveProduct, handleCartItemAdding, handleCartItemRemoving }) => {
  
  const navigate = useNavigate()
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const totalPrice = cartItems.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
      setTotalPrice(totalPrice);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <div className="cart-empty-sign-div">
          <h1 className="cart-empty-sign">Cart Is Empty</h1>
        </div>
      </>
    );
  }

  const handleAddOne = (item) => {
    handleCartItemAdding(item);
  };

  const handlePurchase = ()=>{
    navigate("/purchase")
    setCartItems([])
  }

  return (
    <div className="cart-page-container">
      <div className="cart-items-list">
        {cartItems.map((item, index) => (
          <div key={`${item.id}_${index}`} className="cart-item">
            <img className="cart-popup-images" src={item.image} alt={item.name} />
            <div className="cart-popup-details">
              <div className="cart-popup-name">{item.name}</div>
              <div className="cart-popup-price">${item.quantity * item.price}</div>
            </div>
            <div className="quantity-controls">
              <button className="adding-or-removing-item-in-cart" onClick={() => handleCartItemRemoving(item)}>-</button>
              <span className="home-product-quantity">{item.quantity}</span>
              <button className="adding-or-removing-item-in-cart" onClick={() => handleAddOne(item)}>+</button>
            </div>
            <button className="remove-from-cart-btn" onClick={() => handleRemoveProduct(item)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="total-price">Total: ${totalPrice}</div>
      <button className="purchase-button" onClick={handlePurchase}>Complete Purchase</button>
    </div>
  );
};