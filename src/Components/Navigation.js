import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import "./Home.css";

export default function Navigation({ handleLoggedOut , cartItems }) {
  const [modal, setModal] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleModal = () => {
    setModal(!modal);
    setNavExpanded(false); // Close nav when opening cart
  };

  const toggleNav = () => {
    setNavExpanded(!navExpanded);
  };

  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <div className="up-menu">
        <Link className="logo" to="/">LuxFood</Link>
        
        <ul className={`links ${navExpanded ? 'expanded' : ''}`}>
            <Link className="link" onClick={() => setNavExpanded(false)} to={"/"}>Home</Link>
            <Link className="link" onClick={() => setNavExpanded(false)} to={"/shop"}>Shop</Link>
            {!isLoggedIn ? (
                <>
                    <Link className="link" onClick={() => setNavExpanded(false)} to={"/login"}>Login</Link>
                    <Link className="link" onClick={() => setNavExpanded(false)} to={"/signup"}>Sign Up</Link>
                </>
            ) : (
                <Link onClick={() => { handleLoggedOut(); setNavExpanded(false); }} className="link" to={"/login"}>Log Out</Link>
            )}
             <li onClick={toggleModal} className="link btn">
                Cart ({cartItems.length})
            </li>
        </ul>

        <div className="nav-controls">
            <div className="link theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? <i className="bi bi-moon-stars"></i> : <i className="bi bi-sun"></i>}
            </div>
            <button className="hamburger" onClick={toggleNav}>
                <i className={navExpanded ? "bi bi-x-lg" : "bi bi-list"}></i>
            </button>
        </div>

            {modal && isLoggedIn && (
                <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <h2 className="modal-cart">Cart</h2>
                    <div className="modal-items">
                    {cartItems.map((item, index) => (
                        <div key={`${item.id}_${index}`} className="card-in-popup">
                            <img className="cart-popup-images" src={item.image} alt={item.name} />
                            <div className="cart-popup-details">
                                <div className="cart-popup-name">{item.name}</div>
                                <div className="cart-popup-price">${item.quantity * item.price}</div>
                                <div className="cart-popup-quantity">Qty: {item.quantity}</div>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="modal-buttons">
                        <Link onClick={toggleModal} className="link" to={"/cart"}>Checkout</Link>
                        <button className="close-modal" onClick={toggleModal}>
                        CLOSE
                        </button>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
}