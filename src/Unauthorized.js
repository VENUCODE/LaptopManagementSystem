import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useUser } from "./context/useUser";

const Unauthorized = () => {
  const { logout } = useUser();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold mb-2">Unauthorized Access</h1>
        <p className="text-gray-700 mb-4">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
