import React, { Suspense, useEffect } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import { useUser } from "./context/useUser";
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  const { isAuthenticated } = useUser();
  
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="custom-bg m-0 p-0">
      <Suspense fallback={<div>Loading...</div>}>
        {isAuthenticated && <Header />}
        <AnimatedRoutes />
        {isAuthenticated && (
          <footer className="text-center text-gray-400 dark:text-gray-600 p-4">
            Footer content
          </footer>
        )}
      </Suspense>
    </div>
  );
}

export default App;
