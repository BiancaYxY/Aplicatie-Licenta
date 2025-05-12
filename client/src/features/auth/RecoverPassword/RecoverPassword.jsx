import React, { useState } from "react";
import "./RecoverPassword.css";
import  { resetPassword } from "./recoverPasswordApi";
import { useNavigate } from "react-router-dom";


const RecoverPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Parolele nu coincid.");
      setMessage("");
      return;
    }

    try {
      await resetPassword({
        email: formData.email,
        newPassword: formData.newPassword,
      });

      setMessage("Parola a fost resetată cu succes.");
      setError("");
      setFormData({
        email: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      setError("Eroare la resetarea parolei.");
      setMessage("");
    }
  };

  return (
    <div className="recover-page">
      <div className="recover-card">
        <h2>Resetare Parolă</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <form className="recover-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Parolă nouă"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmare parolă"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Resetează Parola</button>
        </form>
            <div className="recover-links">
                <button type="button" onClick={() => navigate("/login")}>
                Înapoi la Login
                </button>
            </div>
      </div>
    </div>
  );
};

export default RecoverPassword;