import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login/Login";
import Dashboard from "../features/dashboard/Dashboard";
import { AuthProvider } from "../features/auth/authContext";
import Register from "../features/auth/Register/Register";
import RecoverPassword from "../features/auth/RecoverPassword/RecoverPassword";
import Profile from "../features/profile/Profile";
import FeedbackEmployee from "../features/feedback/FeedbackEmployee";
import RoleRoute from "./RoleRoute";
import FeedbackManager from "../features/feedback/FeedbackManager";
import TaskEmployee from "../features/task/TaskEmployee";
import TaskManager from "../features/task/TaskManager";
import LeaveEmployee from "../features/leave/LeaveEmployee";
import LeaveManager from "../features/leave/LeaveManager";
import SalaryEmployee from "../features/salary/SalaryEmployee";
import SalaryManager from "../features/salary/SalaryManager";
import Team from "../features/team/Team";
import AdminAnnouncements from "../features/admin/AdminAnnouncements";
import AdminCreateUser from "../features/admin/AdminCreateUser";

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
        <Route path="/tasks" element={
          <RoleRoute allowedRoles={["employee"]}>
            <TaskEmployee />
        </RoleRoute>
        }/>
        <Route path="/manager/tasks" element={
          <RoleRoute allowedRoles={["manager"]}>
            <TaskManager />
          </RoleRoute>
        }/>
        <Route path="/leave" element={
          <RoleRoute allowedRoles={["employee"]}>
            <LeaveEmployee />
          </RoleRoute>
        } />
        <Route path="/manager/leave" element={
          <RoleRoute allowedRoles={["manager"]}>
            <LeaveManager />
          </RoleRoute>
        } />
        <Route path="/salary" element={
          <RoleRoute allowedRoles={["employee"]}>
            <SalaryEmployee />
          </RoleRoute>
        } />
        <Route path="/manager/salary" element={
          <RoleRoute allowedRoles={["manager"]}>
            <SalaryManager />
          </RoleRoute>
        } />
        <Route path="/manager/team" element={
          <RoleRoute allowedRoles={["manager"]}>
            <Team />
          </RoleRoute>
        } />
        <Route path="/admin/announcements" element={
          <RoleRoute allowedRoles={["admin"]}>
            <AdminAnnouncements />
          </RoleRoute>
        }/>
        <Route path="/admin/create-user" element={
          <RoleRoute allowedRoles={["admin"]}>
            <AdminCreateUser />
           </RoleRoute>
        }/>
      </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;
