import React, { useEffect, useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import { setSalary, updateSalary, fetchAllUsers, fetchAllSalaries } from "./salaryApi";
import "./SalaryManager.css";

const SalaryManager = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    base_salary: "",
    bonus: "",
    month: "Ianuarie",
    year: new Date().getFullYear()
  });

  const [updateData, setUpdateData] = useState({
    user_id: "",
    base_salary: "",
    bonus: "",
    month: "Ianuarie",
    year: new Date().getFullYear()
  });

  const [message, setMessage] = useState("");

  const lunaMap = {
    Ianuarie: "January",
    Februarie: "February",
    Martie: "March",
    Aprilie: "April",
    Mai: "May",
    Iunie: "June",
    Iulie: "July",
    August: "August",
    Septembrie: "September",
    Octombrie: "October",
    Noiembrie: "November",
    Decembrie: "December"
  };

  const luni = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie"
  ];

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchAllUsers();
      setUsers(data.filter(u => u.rank === "employee"));
    };
    loadUsers();
  }, []);

  const handleChange = (e, isUpdate = false) => {
    const { name, value } = e.target;
    isUpdate
      ? setUpdateData(prev => ({ ...prev, [name]: value }))
      : setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        month: lunaMap[formData.month],
      };
      await setSalary(payload);
      setMessage("Salariul a fost adăugat cu succes.");
    } catch (err) {
      setMessage(`${err.message}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { user_id, month, year, base_salary, bonus } = updateData;
      const monthEN = lunaMap[month];

      const allSalaries = await fetchAllSalaries();

      const target = allSalaries.find(
        s =>
          s.user_id === user_id &&
          s.month.toLowerCase() === monthEN.toLowerCase() &&
          String(s.year) === String(year)
      );

      if (!target) {
        setMessage("Salariul nu a fost găsit.");
        return;
      }

      await updateSalary(target.id, {
        base_salary,
        bonus,
        month: monthEN,
        year
      });

      setMessage("Salariu actualizat cu succes.");
    } catch (err) {
      setMessage(` ${err.message}`);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="salary-manager-wrapper">
          <h1 className="salary-title">Administrare Salarii</h1>
          {message && <p className="salary-message">{message}</p>}

          <form className="salary-form" onSubmit={handleSubmit}>
            <h2>Adaugă Salariu</h2>
            <select name="user_id" onChange={handleChange} required>
              <option value="">Selectează angajat</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
            <input name="base_salary" type="number" placeholder="Salariu de bază" onChange={handleChange} required />
            <input name="bonus" type="number" placeholder="Bonus" onChange={handleChange} required />
            <select
              name="month"
              value={updateData.month}
              onChange={(e) => handleChange(e, true)}
            >
              {luni.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <input name="year" type="number" value={formData.year} onChange={handleChange} required />
            <button type="submit">Adaugă</button>
          </form>

          <form className="salary-form" onSubmit={handleUpdate}>
            <h2>Actualizează Salariu</h2>
            <select name="user_id" onChange={(e) => handleChange(e, true)} required>
              <option value="">Selectează angajat</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
            <input name="base_salary" type="number" placeholder="Salariu de bază" onChange={(e) => handleChange(e, true)} required />
            <input name="bonus" type="number" placeholder="Bonus" onChange={(e) => handleChange(e, true)} required />
            <select name="month" onChange={(e) => handleChange(e, true)}>
              {luni.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <input name="year" type="number" value={updateData.year} onChange={(e) => handleChange(e, true)} required />
            <button type="submit">Actualizează</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalaryManager;