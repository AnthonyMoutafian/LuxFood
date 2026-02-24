import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";


export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    setError("");
    if (!name || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.find(u => u.name === name);

    if (userExists) {
      setError("User already exists. Please login.");
      return;
    }

    const newUser = { name, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", name);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="signup-container">
      <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
        <h2>Sign Up</h2>
        {error && <div className="auth-error">{error}</div>}
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Create Account</button>
        <p style={{marginTop: '20px'}}>Already have an account? <Link to="/login" style={{color: 'var(--primary-color)'}}>Login</Link></p>
      </form>
    </div>
  );
}