import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/authContext";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import { fetchMyLeaves, requestLeave } from "./leaveApi";
import "./LeaveEmployee.css";

const LeaveEmployee = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    const data = await fetchMyLeaves();
    setLeaves(data);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestLeave(formData);
      setMessage("Cererea de concediu a fost trimisă cu succes!");
      setFormData({ start_date: "", end_date: "" });
      loadLeaves();
    } catch (err) {
      setMessage("A apărut o eroare la trimiterea cererii.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="leave-wrapper">
          <h1 className="leave-title">Cerere Concediu</h1>
          <form className="leave-form-box" onSubmit={handleSubmit}>
            <label>Data început</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />

            <label>Data sfârșit</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-button">Trimite</button>
            {message && <p className="leave-message">{message}</p>}
          </form>

          <div className="leave-list">
            <h2>Istoric Cereri</h2>
            {leaves.length === 0 ? (
              <p>Nu ai cereri de concediu înregistrate.</p>
            ) : (
              leaves.map((leave) => (
                <div className="leave-card" key={leave.id}>
                  <p><strong>De la:</strong> {leave.start_date.slice(0, 10)}</p>
                  <p><strong>Până la:</strong> {leave.end_date.slice(0, 10)}</p>
                  <p><strong>Status:</strong> {leave.status === "pending" ? "În așteptare" : leave.status === "approved" ? "Aprobat" : "Respins"}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveEmployee;
