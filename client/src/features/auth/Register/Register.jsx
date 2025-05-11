import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { registerUser, getManagers } from "./registerApi";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    team_lead_id: "",
  });

  const [managers, setManagers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const data = await getManagers();
        setManagers(data);
      } catch (err) {
        console.error("Eroare la încărcarea managerilor", err);
      }
    };

    fetchManagers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Parolele nu coincid.");
      return;
    }

    if (!formData.team_lead_id) {
      setError("Te rugăm să selectezi un Team Leader.");
      return;
    }

    try {
      await registerUser({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        rank: "employee",
        team_lead_id: formData.team_lead_id,
      });

      navigate("/");
    } catch (err) {
      setError("Eroare la înregistrare.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Înregistrare utilizator</h2>
        {error && <p className="error">{error}</p>}
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="Prenume"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Nume"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
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
            name="password"
            placeholder="Parolă"
            value={formData.password}
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
          <select
            className="register-select"
            name="team_lead_id"
            value={formData.team_lead_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Selectează un Team Leader --</option>
            {managers.length === 0 ? (
              <option disabled value="">
                Niciun manager disponibil
              </option>
            ) : (
              managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.fullName}
                </option>
              ))
            )}
          </select>
          <button type="submit">Înregistrează-te</button>
        </form>
        <div className="register-links">
          <a href="/">Ai deja cont? Autentifică-te</a>
        </div>
      </div>
    </div>
  );
};

export default Register;