import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login/Login";
//import Dashboard from "../features/dashboard/Dashboard/Dashboard"; // folder gol acum
import { AuthProvider } from "../features/auth/authContext";
import Register from "../features/auth/Register/Register";
import RecoverPassword from "../features/auth/RecoverPassword/RecoverPassword";
import AdminCreateUser from "../features/admin/AdminCreateUser";

function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/admin/create-user" element={<AdminCreateUser />} />
      </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;
