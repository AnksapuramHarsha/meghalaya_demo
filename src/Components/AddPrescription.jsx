import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { MdOutlineLocalHospital } from "react-icons/md";
import { FaClipboardList, FaUserMd } from "react-icons/fa";
import { createPrescription } from "../services/prescriptionService";
import { getPatients } from "../services/patientService";
import { useNavigate } from "react-router-dom";

const RegisterPrescription = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    opd_id: "",
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
    if (!formData.medication.trim()) validationErrors.medication = "Medication is required.";
    if (!formData.dosage.trim()) validationErrors.dosage = "Dosage is required.";
    if (!formData.frequency.trim()) validationErrors.frequency = "Frequency is required.";
    if (!formData.opd_id.trim()) validationErrors.opd_id = "OPD ID is required.";
    if (!formData.duration.trim()) validationErrors.duration = "Duration is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await createPrescription(formData);
      toast.success("Prescription Added!");
      navigate("/prescription-list");
    } catch (error) {
      console.error("Error adding prescription:", error);
      toast.error("Failed to add prescription.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6 flex items-center justify-center gap-2">
          <MdOutlineLocalHospital className="text-3xl text-green-600" /> Add Prescription
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient */}
            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaUserMd className="text-lg text-green-600" /> Select Patient
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
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
              {errors.patient_id && <p className="text-red-500 text-sm">{errors.patient_id}</p>}
            </div>

            {/* Medication */}
            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaClipboardList className="text-green-600" /> Medication
              </label>
              <input
                type="text"
                name="medication"
                value={formData.medication}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-400 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
              {errors.medication && <p className="text-red-500 text-sm">{errors.medication}</p>}
            </div>

            {/* Dosage */}
            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaClipboardList className="text-green-600" /> Dosage
              </label>
              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-400 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
              {errors.dosage && <p className="text-red-500 text-sm">{errors.dosage}</p>}
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaClipboardList className="text-green-600" /> Frequency
              </label>
              <input
                type="text"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-400 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
              {errors.frequency && <p className="text-red-500 text-sm">{errors.frequency}</p>}
            </div>

            {/* OPD ID */}
            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaClipboardList className="text-green-600" /> OPD ID
              </label>
              <input
                type="text"
                name="opd_id"
                value={formData.opd_id}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-400 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
              {errors.opd_id && <p className="text-red-500 text-sm">{errors.opd_id}</p>}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-gray-600 font-medium flex items-center gap-2">
                <FaClipboardList className="text-green-600" /> Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-400 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              />
              {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Submit Prescription
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPrescription;
