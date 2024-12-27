import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";

import { AnimatePresence } from "framer-motion";

import { useUser } from "./context/useUser";
import { LaptopProvider } from "./context/useLaptops";

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
  const { isAuthenticated } = useUser();
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes key={location.pathname} location={location}>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={isAuthenticated ? <Overview /> : <Navigate to="/login" />}
        />
        <Route
          path="/assign"
          element={
            isAuthenticated ? <AssignLaptop /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/reports"
          element={isAuthenticated ? <Reports /> : <Navigate to="/login" />}
        />
        <Route
          path="/logs"
          element={isAuthenticated ? <Logs /> : <Navigate to="/login" />}
        />
        <Route
          path="/requests"
          element={
            isAuthenticated ? <LaptopRequests /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/manage"
          element={
            isAuthenticated ? (
              <LaptopProvider>
                <ManageLaptops />
              </LaptopProvider>
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route
            index
            element={
              isAuthenticated ? <ListLaptop /> : <Navigate to="/login" />
            }
          />
          <Route
            path="list"
            element={
              isAuthenticated ? <ListLaptop /> : <Navigate to="/login" />
            }
          />
          <Route
            path="add"
            element={isAuthenticated ? <AddLaptop /> : <Navigate to="/login" />}
          />
        </Route>

        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
