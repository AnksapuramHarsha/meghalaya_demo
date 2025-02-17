import React from "react";

const Footer = () => (
  <footer className="w-full bg-green-700 text-white text-center py-4 shadow-lg mt-auto">
    <p className="text-sm">
      &copy; {new Date().getFullYear()} All rights reserved | Powered by{" "}
      <span className="font-semibold">Sirobilit</span>
    </p>
  </footer>
);

export default Footer;
