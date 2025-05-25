import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import "./Dashboard.css";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="navbar">
      <span className="navbar-message">
        Ne bucurăm că ai ales să folosești HR Management App! Feedback-ul tău este foarte important pentru noi!
      </span>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;