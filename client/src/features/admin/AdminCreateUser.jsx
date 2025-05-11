import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminCreateUser = () => {
  const { user } = useContext(useAuth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rank: "employee",
    team_lead_id: "",
  });

  const [managers, setManagers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user || user.rank !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axios.get("/api/users?role=manager");
        setManagers(res.data);
      } catch (err) {
        console.error("Error loading managers!", err);
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

    try {
      await axios.post("/api/auth/register", formData);
      setSuccess("Utilizator creat cu succes!");
      setError("");
      setFormData({
        name: "",
        email: "",
        password: "",
        rank: "employee",
        team_lead_id: "",
      });
    } catch (err) {
      setError("Eroare la creare. Verifică datele.");
      setSuccess("");
    }
  };

  return (
    <div className="admin-create-user">
      <h2>Creare utilizator (Admin)</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nume complet"
          value={formData.name}
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

        <select name="rank" value={formData.rank} onChange={handleChange}>
          <option value="employee">Angajat</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <select
          name="team_lead_id"
          value={formData.team_lead_id}
          onChange={handleChange}
        >
          <option value="">Fără team leader</option>
          {managers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <button type="submit">Creează utilizator</button>
      </form>
    </div>
  );
};

export default AdminCreateUser;
