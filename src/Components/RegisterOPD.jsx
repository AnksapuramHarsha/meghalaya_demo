import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineLocalHospital } from "react-icons/md";
import { FaUserMd, FaClipboardList, FaStethoscope } from "react-icons/fa";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    symptoms: "",
    diagnosis: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Patient details saved successfully");
    console.log("Patient Form Submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6 flex items-center justify-center gap-2">
          <MdOutlineLocalHospital className="text-3xl text-green-600" /> Patient Diagnosis
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <MdOutlineLocalHospital className="text-lg text-green-600" /> Select Patient
              </label>
              <select
                name="patient"
                value={formData.patient}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              >
                <option value="" disabled>Select Patient</option>
                <option value="Akash">Akash</option>
                <option value="Abhilash">Abhilash</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaUserMd className="text-green-600" /> Doctor's Name
              </label>
              <input
                type="text"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaClipboardList className="text-green-600" /> Symptoms
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaStethoscope className="text-green-600" /> Diagnosis
              </label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition resize-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;