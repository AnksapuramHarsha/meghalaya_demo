import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { MdOutlineLocalHospital } from "react-icons/md";
import { FaUserMd, FaClipboardList, FaStethoscope } from "react-icons/fa";
import { createOPDVisit } from "../services/opdService";
import { getPatients } from "../services/patientService";
import { useNavigate } from "react-router-dom";

const PatientForm = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_name: "",
    symptoms: "",
    diagnosis: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch patients from API
  const fetchPatients = useCallback(async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.patient_id) validationErrors.patient_id = "Patient is required.";
    if (!formData.doctor_name.trim()) validationErrors.doctor_name = "Doctor's name is required.";
    if (!formData.symptoms.trim()) validationErrors.symptoms = "Symptoms are required.";
    if (!formData.diagnosis.trim()) validationErrors.diagnosis = "Diagnosis is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await createOPDVisit(formData);
      toast.success("OPD Visit Registered!");
      navigate("/opd-list");
    } catch (error) {
      console.error("Error registering OPD visit:", error);
      toast.error("Failed to register OPD visit.");
    }
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
                name="patient_id"
                value={formData.patient_id}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-400 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              >
                <option value="" disabled>Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
              {errors.patient_id && <p className="text-red-500 text-sm">{errors.patient_id}</p>}
            </div>

            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaUserMd className="text-green-600" /> Doctors Name
              </label>
              <input
                type="text"
                name="doctor_name"
                value={formData.doctor_name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-400 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
              {errors.doctor_name && <p className="text-red-500 text-sm">{errors.doctor_name}</p>}
            </div>

            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaClipboardList className="text-green-600" /> Symptoms
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-400 focus:ring-2 focus:ring-green-400 outline-none transition resize-none"
                required
              />
              {errors.symptoms && <p className="text-red-500 text-sm">{errors.symptoms}</p>}
            </div>

            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaStethoscope className="text-green-600" /> Diagnosis
              </label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-400 focus:ring-2 focus:ring-green-400 outline-none transition resize-none"
                required
              />
              {errors.diagnosis && <p className="text-red-500 text-sm">{errors.diagnosis}</p>}
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