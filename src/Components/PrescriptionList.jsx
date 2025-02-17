import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {  FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { MdOutlineList } from "react-icons/md";
import { getPrescriptions, updatePrescription, deletePrescription} from "../services/prescriptionService"; // Import API functions

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Fetch prescriptions from the backend when the component is mounted
  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await getPrescriptions();
      setPrescriptions(response.data); // Update state with fetched prescriptions
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  // Handle edit operation
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData({ ...prescriptions[index] }); // Set form data with prescription details
  };

  // Handle input field changes while editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save after editing
  const handleSave = async () => {
    try {
      await updatePrescription(prescriptions[editIndex].id, formData); // Update the prescription using the API
      const updatedPrescriptions = [...prescriptions];
      updatedPrescriptions[editIndex] = formData; // Update the state with the new prescription data
      setPrescriptions(updatedPrescriptions);
      setEditIndex(null);
      toast.success("Prescription updated successfully!");
    } catch (error) {
      console.error("Error saving prescription:", error);
      toast.error("Failed to update prescription");
    }
  };

  // Handle cancel edit operation
  const handleCancel = () => {
    setEditIndex(null);
    toast.success("Edit canceled");
  };

  // Handle delete operation
  const handleDelete = async () => {
    try {
      await deletePrescription(prescriptions[deleteIndex].id); // Delete the prescription from the backend
      setPrescriptions(prescriptions.filter((_, i) => i !== deleteIndex)); // Remove from the list in the state
      toast.success("Prescription deleted successfully!");
      setDeleteIndex(null);
    } catch (error) {
      console.error("Error deleting prescription:", error);
      toast.error("Failed to delete prescription");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl border border-gray-300 p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700 flex items-center justify-center gap-2">
          <MdOutlineList className="text-3xl" /> Prescription List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-md rounded-lg text-gray-900 bg-white">
            <thead className="bg-green-600 text-white w-full">
              <tr>
                <th className="p-3">S.No</th>
                <th className="p-3">Patient ID</th>
                <th className="p-3">OPD Visit ID</th>
                <th className="p-3">Medication</th>
                <th className="p-3">Dosage</th>
                <th className="p-3">Frequency</th>
                <th className="p-3 text-center">Duration</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription, index) => (
                <tr key={index} className="hover:text-green-600 text-center border-b hover:bg-gray-100 transition">
                  {Object.values(prescription).map((value, i) => (
                    <td key={i} className="p-3">{value}</td>
                  ))}
                  <td className="p-3 flex justify-center gap-3">
                    <button onClick={() => handleEdit(index)} className="p-2 bg-green-600 text-white rounded hover:bg-green-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => setDeleteIndex(index)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Dialog */}
        {deleteIndex !== null && (
          <div className="fixed inset-0 flex items-center justify-center ">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <h3 className="text-xl font-semibold text-red-600 mb-4">⚠️ Confirm Delete</h3>
              <p>Are you sure you want to delete this prescription?</p>
              <div className="flex justify-center gap-4 mt-4">
                <button onClick={handleDelete} className="p-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600">Yes</button>
                <button onClick={() => setDeleteIndex(null)} className="p-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600">No</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Prescription Modal */}
        {editIndex !== null && (
          <div className="fixed inset-0 flex items-center justify-center ">
            <div className="bg-white p-6 rounded-lg shadow-xl w-auto text-gray-900">
              <h3 className="text-xl font-semibold mb-4 text-center text-teal-700 flex items-center justify-center gap-2">
                <FaEdit /> Edit Prescription
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(formData).map((key, index) => (
                    <div key={index} className="flex flex-col">
                      <label className="font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                      </label>
                      <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="p-2 border rounded focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="p-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 flex items-center gap-2"
                  >
                    <FaSave /> Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="p-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 flex items-center gap-2"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionList;

