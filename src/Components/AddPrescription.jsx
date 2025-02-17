import { useState } from "react";
import toast from "react-hot-toast";
import { FaNotesMedical } from "react-icons/fa";

const AddPrescription = () => {
  const [formData, setFormData] = useState({
    patient: "",
    medication: "",
    dosage: "",
    frequency: "",
    opdId: "",
    duration: "",
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
    toast.success("Prescription details saved successfully");
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-3xl  mx-auto mt-35 p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-6 flex items-center justify-center gap-2">
        <FaNotesMedical className="text-3xl" /> Add Prescription
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium">Select Patient</label>
              <select
                name="patient"
                value={formData.patient}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition"
                required
              >
                <option value="" disabled>Select Patient</option>
                <option value="patient1">Abhilash</option>
                <option value="patient2">Akash</option>
              </select>
            </div>

            {["medication", "dosage", "frequency", "opdId", "duration"].map((field) => (
              <div key={field}>
                <label className="block text-gray-600 font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-green-400 outline-none transition"
                  required
                />
              </div>
            ))}
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

export default AddPrescription;