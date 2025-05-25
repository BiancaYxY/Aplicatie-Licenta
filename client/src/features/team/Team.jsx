import React, { useEffect, useState } from "react";
import { getTeamMembers, getTeamPerformance } from "./teamApi";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import "./Team.css";

const Team = () => {
  const [members, setMembers] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersData = await getTeamMembers();
        const performanceData = await getTeamPerformance();
        setMembers(membersData);
        setPerformance(performanceData);
      } catch (error) {
        console.error("Error loading team data", error);
        setError("Eroare la încărcarea datelor despre echipă.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Se încarcă...</div>;
  if (error || !performance) return <div>{error || "Eroare necunoscută."}</div>;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-section">
        <Navbar />
        <div className="team-container">
          <h2>Echipa Mea</h2>
          <div className="team-summary-wrapper">
            <div className="team-summary">
                <p><strong>Număr membri:</strong> {performance.teamSize}</p>
                <p>
                    <strong>Performanță medie:</strong>{" "}
                    <span className="performance-badge">{performance.averageTeamPerformance}</span>
                </p>
            </div>
            <table className="team-table">
                <thead>
                <tr>
                    <th>Angajat</th>
                    <th>Task-uri totale</th>
                    <th>Finalizate</th>
                    <th>Performanță</th>
                </tr>
                </thead>
                <tbody>
                {(performance.breakdown || []).map((stat, idx) => (
                    <tr key={idx}>
                    <td>{stat.employee}</td>
                    <td>{stat.totalTasks}</td>
                    <td>{stat.completedTasks}</td>
                    <td>{stat.performance}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Team;