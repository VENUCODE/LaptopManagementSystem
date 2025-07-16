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
   
    // Define the ldfdr function
    window.ldfdr = window.ldfdr || function () {
      (window.ldfdr._q = window.ldfdr._q || []).push([].slice.call(arguments));
    };

    // Create the script element
    const script = document.createElement('script');
    script.src = 'https://sc.lfeeder.com/lftracker_v1_3P1w24dmAdzamY5n.js';
    script.async = true;

    // Append to document
    document.head.appendChild(script);

    // Cleanup script on unmount (optional)
    return () => {
      document.head.removeChild(script);
    };
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
