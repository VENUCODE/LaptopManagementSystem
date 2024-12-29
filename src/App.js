import React, { Suspense, useEffect } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import { useUser } from "./context/useUser";
import AnimatedRoutes from "./AnimatedRoutes";
import DomLoader from "./DomLoader";
import { useLocale } from "antd/es/locale";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
function App() {
  const { isAuthenticated } = useUser();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="custom-bg m-0 p-0">
      <Suspense
        fallback={
          <div className="bg-white relative h-screen w-screen dark:bg-indigo-950  flex justify-center items-center">
            <DomLoader />
          </div>
        }
      >
        {isAuthenticated && <Header />}
        <AnimatedRoutes />
        {isAuthenticated && <Footer />}
      </Suspense>
    </div>
  );
}

export default App;
