import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");
    if (!name || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.name === name && u.password === password);

    if (user) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", name);
      navigate("/");
      window.location.reload();
    } else {
      setError("Invalid name or password.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <h2>Login</h2>
        {error && <div className="auth-error">{error}</div>}
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <p style={{marginTop: '20px'}}>Don't have an account? <Link to="/signup" style={{color: 'var(--primary-color)'}}>Sign Up</Link></p>
      </form>
    </div>
  );
}
