import React, { useEffect, useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import { fetchMySalaries, downloadPayslip } from "./salaryApi";
import "./SalaryEmployee.css";

const SalaryEmployee = () => {
  const [salaries, setSalaries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSalaries = async () => {
      try {
        const data = await fetchMySalaries();
        setSalaries(data);
      } catch (err) {
        setError("Nu s-au putut încărca salariile.");
        console.error(err);
      }
    };
    loadSalaries();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="salary-wrapper">
          <h1 className="salary-title">Salariile Mele</h1>
          <button className="download-button" onClick={downloadPayslip}>
            Descarcă fluturaș PDF
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="salary-list">
            {salaries.map((salary) => (
              <div className="salary-card" key={salary.id}>
                <p><strong>Lună:</strong> {salary.month} {salary.year}</p>
                <p><strong>Salariu de bază:</strong> {salary.base_salary} RON</p>
                <p><strong>Bonus:</strong> {salary.bonus} RON</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryEmployee;
