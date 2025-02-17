import React from "react";
import { FaHospital, FaUserMd, FaPills, FaAmbulance } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";

const HospitalDetails = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-700 to-teal-600 p-6">
      <div className="bg-white p-8 max-w-3xl w-full shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-4xl font-bold text-green-800 mb-6 text-center flex items-center justify-center gap-3">
          <FaHospital className="text-green-800" /> About Our Hospital
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          Our hospital provides world-class medical facilities with highly trained professionals
          and state-of-the-art technology. We are committed to ensuring the best patient care and
          healthcare services.
        </p>
        <div className="mt-6 border-t pt-4">
          <h3 className="text-2xl font-semibold text-green-700 text-center flex items-center justify-center gap-2">
            <MdMedicalServices className="text-green-700" /> Our Services
          </h3>
          <ul className="mt-4 space-y-2 text-gray-800 text-lg text-center">
            <li className="flex items-center justify-center gap-2">
              <FaAmbulance className="text-teal-500 text-xl" /> 24/7 Emergency Care
            </li>
            <li className="flex items-center justify-center gap-2">
              <FaUserMd className="text-teal-500 text-xl" /> Outpatient Services (OPD)
            </li>
            <li className="flex items-center justify-center gap-2">
              <FaPills className="text-teal-500 text-xl" /> Pharmacy & Lab Services
            </li>
            <li className="flex items-center justify-center gap-2">
              <MdMedicalServices className="text-teal-500 text-xl" /> Specialist Consultations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
