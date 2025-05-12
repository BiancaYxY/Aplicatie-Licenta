import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/authContext";

const RoleRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.rank)) return <Navigate to="/unauthorized" />;

  return children;
};

export default RoleRoute;