import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./context/useUser";
import { message } from "antd";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { isAuthenticated, user, logout } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    message.error("unauthorized access", 2);
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoutes;
