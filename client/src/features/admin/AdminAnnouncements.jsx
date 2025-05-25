import React, { useEffect, useState } from "react";
import { getAllAnnouncements, createAnnouncement, deleteAnnouncement } from "./adminApi";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import "./AdminAnnouncements.css";

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await getAllAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      setError("Eroare la încărcarea anunțurilor.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement(formData);
      setFormData({ title: "", content: "" });
      fetchData();
    } catch (err) {
      setError("Eroare la trimiterea anunțului.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      fetchData();
    } catch (err) {
      setError("Eroare la ștergerea anunțului.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-section">
        <Navbar />
        <div className="admin-container">
          <h2>Administrare Anunțuri</h2>
          {error && <p className="error-message">{error}</p>}

          <form className="announcement-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Titlu"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Conținut"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            ></textarea>
            <button type="submit">Adaugă Anunț</button>
          </form>

          <ul className="announcement-list">
            {announcements.map((a) => (
              <li key={a.id} className="announcement-item">
                <div>
                  <strong>{a.title}</strong>
                  <p>{a.content}</p>
                </div>
                <button onClick={() => handleDelete(a.id)}> Șterge </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncements;