import React, { useState } from "react";
import { useAuth } from "../authContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="/logo_hr_app.png" alt="HR App Logo" className="login-logo" />
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log in</button>
        </form>
        <div className="login-links">
            <Link to="/register">Nu ai cont? Înregistrează-te</Link>
            <Link to="/recover-password">Ai uitat parola?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
