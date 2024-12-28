import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";

import { AnimatePresence } from "framer-motion";

import { useUser } from "./context/useUser";
import { LaptopProvider } from "./context/useLaptops";
import { EmployeeProvider } from "./context/useEmployee";
import ProtectedRoutes from "./ProtectedRoutes";
import Unauthorized from "./Unauthorized";
import Dashboard from "./components/Employee";
import RequestLaptop from "./components/Employee/RequestLaptop";
import { EmployeeLaptopsProvider } from "./context/useEmployeeLaptops";
import EmployeeReports from "./components/Employee/AllReports";

const Overview = lazy(() => import("./components/OverView"));
const ManageLaptops = lazy(() => import("./components/Manage"));
const AddLaptop = lazy(() => import("./components/Manage/AddLaptop"));
const ListLaptop = lazy(() => import("./components/Manage/ListLaptop"));
const AssignLaptop = lazy(() => import("./components/Assign"));
const Reports = lazy(() => import("./components/Reports"));
const Logs = lazy(() => import("./components/Logs"));
const LaptopRequests = lazy(() => import("./components/Requests"));
const Login = lazy(() => import("./components/Login"));
function AnimatedRoutes() {
  const { isAuthenticated, user } = useUser();
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login />
            ) : (
              <Navigate to={user?.role === "admin" ? "/" : "/dashboard"} />
            )
          }
        />

        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/" element={<Overview />} />
          <Route
            path="/assign"
            element={
              <EmployeeProvider>
                <AssignLaptop />
              </EmployeeProvider>
            }
          />

          <Route path="/reports" element={<Reports />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/requests" element={<LaptopRequests />} />
          <Route
            path="/manage"
            element={
              <LaptopProvider>
                <ManageLaptops />
              </LaptopProvider>
            }
          >
            <Route index element={<ListLaptop />} />
            <Route path="list" element={<ListLaptop />} />
            <Route path="add" element={<AddLaptop />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoutes allowedRoles={["employee"]} />}>
          <Route
            path="/dashboard"
            element={
              <EmployeeLaptopsProvider>
                <Dashboard />
              </EmployeeLaptopsProvider>
            }
          />
          <Route path="/request-laptop" element={<RequestLaptop />} />
          <Route path="/reportlaptop" element={<EmployeeReports />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
