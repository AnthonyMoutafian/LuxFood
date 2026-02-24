import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Shop from "../Components/Shop";
import { useEffect, useState } from "react";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import { Cart } from "../Components/Cart";
import { data } from "../Components/Data";
import Navigation from "../Components/Navigation";
import Purchase from "../Components/Purchase";
import Footer from "../Components/Footer";

export default function RouterFunction() {
  const { productItems } = data;
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const triggerToast = () => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: "Food successfully added to cart!" }]);
    
    setTimeout(() => {
        setToasts((prev) => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const handleCartItem = (productItem) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === productItem.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...productItem, quantity: 1 }]);
    }
    triggerToast();
  };

  const handleRemoveProduct = (productItem) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productItem.id);
    setCartItems(updatedCartItems);
  };

  const handleCartItemAdding = (productItem) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === productItem.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    }
  };

  const handleCartItemRemoving = (productItem) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === productItem.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];

      if (updatedCartItems[existingItemIndex].quantity >= 2) {
        updatedCartItems[existingItemIndex].quantity -= 1;
        setCartItems(updatedCartItems);
      } else {
        const newCartItems = updatedCartItems.filter((item) => item.id !== productItem.id);
        setCartItems(newCartItems);
      }
    }
  };

  const handleLoggedOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="app-container">
      <Navigation cartItems={cartItems} handleLoggedOut={handleLoggedOut} />
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={loggedIn ? (
              <Home />
            ) : (
              <Navigate to="/login" replace={true} />
            )}
          />
          <Route
            path="/shop"
            element={loggedIn ? (
              <Shop
                setCartItems={setCartItems}
                handleRemoveProduct={handleRemoveProduct}
                productItems={productItems}
                handleCartItem={handleCartItem}
                handleLoggedOut={handleLoggedOut}
              />
            ) : (
              <Navigate to="/login" replace={true} />
            )}
          />
          <Route
            path="/cart"
            element={loggedIn ? (
              <Cart
                setCartItems={setCartItems}
                handleCartItemRemoving={handleCartItemRemoving}
                handleCartItemAdding={handleCartItemAdding}
                cartItems={cartItems}
                handleRemoveProduct={handleRemoveProduct}
                productItems={productItems}
                handleCartItem={handleCartItem}
                handleLoggedOut={handleLoggedOut}
              />
            ) : (
              <Navigate to="/login" replace={true} />
            )}
          />
          <Route
            path="/signup"
            element={loggedIn ? (
              <Navigate to="/" replace={true} />
            ) : (
              <SignUp />
            )}
          />
          <Route
            path="/login"
            element={loggedIn ? (
              <Navigate to="/" replace={true} />
            ) : (
              <Login />
            )}
          />
          <Route 
            path="/purchase"
            element={
              <Purchase/>
            }
          />
        </Routes>
      </main>
      <Footer />
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-notification">
              <i className="bi bi-check-circle-fill"></i>
              {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}