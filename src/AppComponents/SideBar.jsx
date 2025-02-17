import { FaBars, FaTimes, FaHome, FaUserInjured, FaNotesMedical, FaHospital } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation(); // Detect route changes

  // Close sidebar only on mobile when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`fixed top-0 h-full p-4 flex flex-col transition-[width] duration-700 ease-in-out ${
          isOpen ? "w-48 bg-gradient-to-r from-green-700 to-teal-800 backdrop-blur-md text-white" : "w-0 overflow-hidden"
        }`}
      >
        {/* Sidebar Header */}
        {isOpen && <h2 className="text-2xl font-bold text-white">Dashboard</h2>}

        {/* Navigation Links */}
        {isOpen && (
          <nav className="flex flex-col gap-4 mt-20">
            <Link
              to="/"
              className={`flex items-center gap-4 p-3 text-white ${
                location.pathname === "/" ? "bg-green-600" : "hover:bg-green-700"
              } rounded-md`}
              onClick={handleLinkClick}
            >
              <FaHome size={22} />
              <span>Home</span>
            </Link>

            <Link
              to="/patient-list"
              className={`flex items-center gap-4 p-3 text-white ${
                location.pathname === "/patient-list" ? "bg-green-600" : "hover:bg-green-700"
              } rounded-md`}
              onClick={handleLinkClick}
            >
              <FaUserInjured size={22} />
              <span>Patients</span>
            </Link>

            <Link
              to="/prescription-list"
              className={`flex items-center gap-4 p-3 text-white ${
                location.pathname === "/prescription-list" ? "bg-green-600" : "hover:bg-green-700"
              } rounded-md`}
              onClick={handleLinkClick}
            >
              <FaNotesMedical size={22} />
              <span>Prescriptions</span>
            </Link>

            <Link
              to="/hospital-branches"
              className={`flex items-center gap-4 p-3 text-white ${
                location.pathname === "/hospital-branches" ? "bg-green-600" : "hover:bg-green-700"
              } rounded-md`}
              onClick={handleLinkClick}
            >
              <FaHospital size={22} />
              <span>Hospitals</span>
            </Link>
          </nav>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-16 mt-5 z-50 p-2 rounded-md shadow-lg bg-white ${
          isOpen ? "text-green-800 left-49" : "text-teal-700 left-5"
        }`}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
    </div>
  );
};

export default Sidebar;
