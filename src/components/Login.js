import { useUser } from "../context/useUser";

import { useState } from "react";
import { pageVariant } from "../variants";
import { motion } from "framer-motion";
export default function LoginComponent() {
  const { login } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = e.target.elements;
    login(
      { email: email.value, password: password.value, role: role.value },
      setLoading
    );
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
        variants={pageVariant}
        className="h-screen flex justify-center items-center m-0 py-2 relative overflow-hidden bg-slate-200"
      >
        <div className="absolute inset-0 z-2">
          <div className="absolute top-1/2 left-1/5 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-2xl"></div>
        </div>

        <div
          className="w-full mx-5 py-4 lg:w-1/3 md:mx-1/3 lg:py-10 px-10  h-full relative z-10 bg-slate-50/50  outline outline-2 outline-violet-300/50 shadow-inner shadow-slate-50 rounded-md"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div className="sm:mx-auto sm:container sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-900"
                >
                  SignIn as
                </label>
                <div className="mt-2">
                  <select
                    id="role"
                    name="role"
                    defaultValue={"admin"}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 invalid:outline-red-500 sm:text-sm"
                  >
                    <option value={"admin"}>Admin</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 invalid:outline-red-500 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-red-500 invisible peer-invalid:visible">
                    Please enter a valid email address.
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="**********"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? "signing you in...." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
}
