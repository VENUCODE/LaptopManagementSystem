import React from "react";

const Footer = () => {
  return (
    <footer className="w-screen  bg-glass text-gray-600 dark:text-indigo-500 dak:bg-blue-900 p-4 transition-all duration-100">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Yedukondalu Naik
        </p>
      </div>
    </footer>
  );
};

export default Footer;
