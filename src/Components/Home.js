import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-info-container">
      <div className="hero-section">
        <h1>Welcome to LuxFood</h1>
        <p>Discover the finest ingredients and gourmet meals delivered to your door.</p>
      </div>
      
      <div className="info-grid">
        <div className="info-card">
          <i className="bi bi-egg-fried"></i>
          <h3>Quality Ingredients</h3>
          <p>We source only the freshest organic produce and premium meats from local farms.</p>
        </div>
        <div className="info-card">
          <i className="bi bi-clock-history"></i>
          <h3>Fast Delivery</h3>
          <p>Your food is prepared and shipped within hours to ensure maximum freshness.</p>
        </div>
        <div className="info-card">
          <i className="bi bi-award"></i>
          <h3>Expert Chefs</h3>
          <p>Our recipes are crafted by world-class chefs specializing in global cuisines.</p>
        </div>
      </div>

      <div className="food-topics">
        <h2>Our Food Philosophy</h2>
        <div className="topic">
          <h3>Sustainable Sourcing</h3>
          <p>We believe in food that's good for you and the planet. That's why we prioritize sustainable farming practices.</p>
        </div>
        <div className="topic">
          <h3>Nutrition First</h3>
          <p>Every meal is balanced with the right amount of proteins, healthy fats, and complex carbohydrates.</p>
        </div>
      </div>
    </div>
  );
}