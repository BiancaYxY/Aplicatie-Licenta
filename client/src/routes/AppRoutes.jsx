import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login/Login";
//import Dashboard from "../features/dashboard/Dashboard/Dashboard"; // folder gol acum
import { AuthProvider } from "../features/auth/authContext";
import  Register from "../features/auth/Register/Register";
import RecoverPassword from "../features/auth/RecoverPassword/RecoverPassword";


function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="recover-password" element={<RecoverPassword />} />
      </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;
