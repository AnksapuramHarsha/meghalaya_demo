import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopBar from "../AppComponents/TopBar";
import Footer from "../AppComponents/Footer";
import Sidebar from "../AppComponents/SideBar";
import toast from "react-hot-toast";

const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar remains open by default
  const location = useLocation(); // Track route changes
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Control sidebar state

  useEffect(() => {
    // If no token is found in localStorage, redirect to the login page
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove auth token
    toast.success("Logged out successfully");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <TopBar handleLogout={handleLogout} />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-500 p-4 ${isOpen ? "ml-48" : "ml-0"}`}>
          <Outlet key={location.pathname} /> {/* Ensure correct re-rendering */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
