import React from "react"
import { Link } from "react-router-dom"

export default function Purchase() {
  return (
    <div className="purchase-success">
      <h1>Thank You!</h1>
      <p style={{fontSize: '1.2rem', marginBottom: '30px', color: 'var(--text-color)'}}>Your order has been placed successfully.</p>
      <Link className="link" style={{background: 'var(--primary-color)', color: 'white'}} to={"/"}>Return to Store</Link>
    </div>
  );
}