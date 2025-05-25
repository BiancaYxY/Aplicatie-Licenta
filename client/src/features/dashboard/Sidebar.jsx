import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToFeedback = () => {
    if (!user) return;
    if (user.rank === "employee") navigate("/feedback");
    else if (user.rank === "manager") navigate("/manager/feedback");
    else navigate("/unauthorized");
  };

  const goToTasks = () => {
    if (!user) return;
    if (user.rank === "employee") navigate("/tasks");
    else if (user.rank === "manager") navigate("/manager/tasks");
    else navigate("/unauthorized");
  };

    const goToLeave = () => {
    if (!user) return;
    if (user.rank === "employee") navigate("/leave");
    else if (user.rank === "manager") navigate("/manager/leave");
    else navigate("/unauthorized");
  };

    const goToSalary = () => {
      if (!user) return;
      if (user.rank === "employee") navigate("/salary");
      else if (user.rank === "manager") navigate("/manager/salary");
      else navigate("/unauthorized");
  };

    const goToTeam = () => {
      if (!user) return;
      if (user.rank === "manager") navigate("/manager/team");
      else navigate("/unauthorized");
  };

  return (
    <div className="sidebar">
      <Link to="/dashboard">
        <img src="/logo_hr_app.png" alt="Logo" className="sidebar-logo" />
      </Link>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {user?.rank === "employee" && (
          <>
            <li><Link to="/profile">Profil</Link></li>
            <li><button className="sidebar-link" onClick={goToFeedback}>Feedback</button></li>
            <li><button className="sidebar-link" onClick={goToTasks}>Taskuri</button></li>
            <li><button className="sidebar-link" onClick={goToLeave}>Concedii</button></li>
            <li><button className="sidebar-link" onClick={goToSalary}>Salarii</button></li>
          </>
        )}

        {user?.rank === "manager" && (
          <>
            <li><Link to="/profile">Profil</Link></li>
            <li><button className="sidebar-link" onClick={goToFeedback}>Feedback</button></li>
            <li><button className="sidebar-link" onClick={goToTasks}>Taskuri</button></li>
            <li><button className="sidebar-link" onClick={goToLeave}>Concedii</button></li>
            <li><button className="sidebar-link" onClick={goToSalary}>Salarii</button></li>
            <li><button className="sidebar-link" onClick={goToTeam}>Echipa Mea</button></li>
          </>
        )}

        {user?.rank === "admin" && (
          <>
            <li><Link to="/admin/announcements">Anunțuri</Link></li>
            <li><Link to="/admin/create-user">Creare Utilizator</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;