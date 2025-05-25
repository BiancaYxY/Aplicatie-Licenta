import React, { useEffect, useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import { fetchTeamLeaves, updateLeaveStatus, fetchUserById } from "./leaveApi";
import "./LeaveManager.css";

const LeaveManager = () => {
  const [leaves, setLeaves] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    const data = await fetchTeamLeaves();
    if (!Array.isArray(data)) {
      console.error("Răspuns invalid:", data);
      setLeaves([]);
      return;
    }
    setLeaves(data);

    const names = {};
    const statuses = {};
    for (const leave of data) {
      if (!names[leave.user_id]) {
        const user = await fetchUserById(leave.user_id);
        names[leave.user_id] = `${user.first_name} ${user.last_name}`;
      }
      statuses[leave.id] = leave.status;
    }

    setUserNames(names);
    setSelectedStatuses(statuses);
  };

  const handleSelectChange = (leaveId, newStatus) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [leaveId]: newStatus,
    }));
  };

  const handleConfirm = async (leaveId) => {
    try {
      const newStatus = selectedStatuses[leaveId];
      await updateLeaveStatus(leaveId, newStatus);
      setMessage("Statusul a fost actualizat cu succes.");
      loadLeaves();
    } catch (err) {
      console.error("Eroare la actualizare:", err);
      setMessage("Eroare la actualizarea statusului.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="leave-wrapper">
          <h1 className="leave-title">Cereri Concedii - Echipa Mea</h1>
          {message && <p className="leave-message">{message}</p>}
          {leaves.length === 0 ? (
            <p>Nu există cereri de concediu.</p>
          ) : (
            leaves.map((leave) => (
              <div className="leave-card" key={leave.id}>
                <p><strong>Angajat:</strong> {userNames[leave.user_id] || "Se încarcă..."}</p>
                <p><strong>De la:</strong> {leave.start_date.slice(0, 10)}</p>
                <p><strong>Până la:</strong> {leave.end_date.slice(0, 10)}</p>
                <p><strong>Status curent:</strong> {leave.status === "pending" ? "În așteptare" : leave.status === "approved" ? "Aprobat" : "Respins"}</p>
                
                <select
                  value={selectedStatuses[leave.id]}
                  onChange={(e) => handleSelectChange(leave.id, e.target.value)}
                >
                  <option value="approved">Aprobat</option>
                  <option value="rejected">Respins</option>
                </select>
                <button className="confirm-button" onClick={() => handleConfirm(leave.id)}>
                  Confirmă
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManager;