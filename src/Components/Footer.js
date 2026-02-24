import React from "react";
import "./Home.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>LuxFood &copy; {currentYear}. All rights reserved.</p>
      </div>
    </footer>
  );
}
