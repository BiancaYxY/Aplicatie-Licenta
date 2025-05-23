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

  return (
    <div className="sidebar">
      <Link to="/dashboard">
        <img src="/logo_hr_app.png" alt="Logo" className="sidebar-logo" />
      </Link>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profil</Link></li>
        <li><button className="sidebar-link" onClick={goToFeedback}>Feedback</button></li>
        <li><button className="sidebar-link" onClick={goToTasks}>Taskuri</button></li>
        <li><Link to="#">Setări</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;