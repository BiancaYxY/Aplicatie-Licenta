import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login/Login";
import Dashboard from "../features/dashboard/Dashboard";
import { AuthProvider } from "../features/auth/authContext";
import Register from "../features/auth/Register/Register";
import RecoverPassword from "../features/auth/RecoverPassword/RecoverPassword";
import AdminCreateUser from "../features/admin/AdminCreateUser";
import Profile from "../features/profile/Profile";
import FeedbackEmployee from "../features/feedback/FeedbackEmployee";
import RoleRoute from "./RoleRoute";
import FeedbackManager from "../features/feedback/FeedbackManager";

function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/create-user" element={<AdminCreateUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feedback" element={
          <RoleRoute allowedRoles={["employee"]}>
            <FeedbackEmployee />
          </RoleRoute>
        }/>
      <Route path="/manager/feedback" element={
          <RoleRoute allowedRoles={["manager"]}>
            <FeedbackManager />
          </RoleRoute>
        }/>

      </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;
