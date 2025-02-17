import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineUserAdd} from "react-icons/ai";
import { FaUser, FaIdCard, FaVenusMars, FaCalendarAlt, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createPatient } from "../services/patientService";

const RegisterPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    abha_number: "",
    gender: "Male",
    dob: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      await createPatient(formData);
      toast.success("Patient Details saved successfully");
      navigate("/patient-list");
    } catch (error) {
      console.error("Error registering patient:", error);
      alert("Failed to register patient.");
    }
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-6 flex items-center justify-center gap-2">
      <AiOutlineUserAdd className="text-3xl" />
        Register Patient
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaUser /> Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaIdCard /> ABHA Number
              </label>
              <input
                type="text"
                name="abha_number"
                value={formData.abha_number}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaVenusMars /> Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaCalendarAlt /> Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaPhone className="transform scale-x-[-1]" /> Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-600 font-medium flex items-center gap-2">
              <FaMapMarkerAlt /> Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPatient;
