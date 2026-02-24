import React from "react";
import "./Home.css";

export default function Shop({productItems , handleCartItem}) {

  return (
    <div className="home-container">
      {productItems.map((productItem) => (
        <div className="card" key={productItem.id}>
           <img className="home-product-images" src={productItem.image} alt={productItem.name} />
           <h3>{productItem.name}</h3>
           <div className="price">${productItem.price}</div>
           <div className="info">
             <p className="ingredients">Ingredients: {productItem.info.ingredients}</p>
             <p className="colories">Calories: {productItem.info.calories}</p>
           </div>
           <button onClick={() => handleCartItem(productItem)} className="add-to-cart">
             Add To Cart
           </button>
        </div>
      ))}
    </div>
  );
}
