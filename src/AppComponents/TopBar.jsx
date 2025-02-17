import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd, AiOutlineFileText } from "react-icons/ai";
import { MdOutlineList, MdOutlineLocalHospital, MdOutlineMedication } from "react-icons/md";
import { FaClipboardList ,FaSignOutAlt} from "react-icons/fa";
import logo from "../assets/himalaya.png";

const TopBar = ({handleLogout}) => (
  
  <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-700 to-teal-600 text-white shadow-lg p-3 z-50 flex items-center justify-between">
    <div className="flex items-center">
      <Link to="/hospital-details" className="flex items-center">
        <img src={logo} alt="Company Logo" className="h-12 mr-3 drop-shadow-lg" />
        <h1 className="text-xl font-bold tracking-wide cursor-pointer">Meghalaya Health Welfare</h1>
      </Link>
    </div>
    <nav className="flex space-x-3">
      <Link className="px-2 py-2 bg-white text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all" to="/register-patient">
        <AiOutlineUserAdd className="text-lg" /> <span>Register</span>
      </Link>
      <Link className="px-2 py-2 bg-white text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all" to="/patient-list">
        <MdOutlineList className="text-lg" /> <span>Patients</span>
      </Link>
      <Link className="px-2 py-2 bg-white text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all" to="/register-opd">
        <MdOutlineLocalHospital className="text-lg" /> <span>OPD</span>
      </Link>
      <Link className="px-2 py-2 bg-white text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all" to="/opd-list">
        <FaClipboardList className="text-lg" /> <span>OPD List</span>
      </Link>
      <Link className="px-2 py-2 bg-white text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all" to="/register-prescription">
        <MdOutlineMedication className="text-lg" /> <span>Add Prescription</span>
      </Link>
      <Link className="px-2 py-2 bg-white text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all" to="/prescription-list">
        <AiOutlineFileText className="text-lg" /> <span>Prescriptions</span>
      </Link>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
      >
        Logout
      </button>


    </nav>
  </div>
);

export default TopBar;
