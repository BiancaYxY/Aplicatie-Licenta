import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import "./AdminCreateUser.css";

const AdminCreateUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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
        const res = await fetch("/api/users/all", {
          credentials: "include",
        });
        const data = await res.json();
        const onlyManagers = data.filter(u => u.rank === "manager");
        setManagers(onlyManagers);
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Eroare la creare utilizator");
      setSuccess("Utilizator creat cu succes!");
      setError("");
      setFormData({
        first_name: "",
        last_name: "",
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
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-section">
        <Navbar />
        <div className="admin-user-container">
          <h2 className="admin-title">Creare utilizator</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <form className="create-user-form" onSubmit={handleSubmit}>
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
                  {m.first_name} {m.last_name}
                </option>
              ))}
            </select>

            <button type="submit">Creează utilizator</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateUser;
