import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes, } from "react-icons/fa";
import { getOPDVisits, deleteOPDVisit, updateOPDVisit } from "../services/opdService";

const OPDList = () => {
  const [opdVisits, setOpdVisits] = useState([]);
  const [editingVisit, setEditingVisit] = useState(null); // State for the modal
  const [formData, setFormData] = useState({
    doctor_name: "",
    symptoms: "",
    diagnosis: "",
  });

  // Fetch OPD visits on component mount
  useEffect(() => {
    fetchOPDVisits();
  }, []);

  // Fetch OPD visits from the backend
  const fetchOPDVisits = async () => {
    try {
      const response = await getOPDVisits();
      setOpdVisits(response.data); // Update state with fetched OPD visits
    } catch (error) {
      console.error("Error fetching OPD visits:", error);
    }
  };

  // Delete OPD visit
  const handleDelete = async (id) => {
    try {
      await deleteOPDVisit(id); // Delete the OPD visit from the backend
      setOpdVisits((prevVisits) => prevVisits.filter((visit) => visit.id !== id)); // Remove from the list
    } catch (error) {
      console.error("Error deleting OPD visit:", error);
    }
  };

  // Open edit modal with OPD visit details
  const handleEdit = (visit) => {
    setEditingVisit(visit);
    setFormData({
      doctor_name: visit.doctor_name,
      symptoms: visit.symptoms,
      diagnosis: visit.diagnosis,
    });
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (update OPD visit)
  const handleSave = async () => {
    try {
      await updateOPDVisit(editingVisit.id, formData); // Update the OPD visit using the API
      setEditingVisit(null); // Close the modal
      fetchOPDVisits(); // Refresh the OPD visits list
    } catch (error) {
      console.error("Error saving OPD visit:", error);
    }
  };

  // Handle cancel button (close modal)
  const handleCancel = () => {
    setEditingVisit(null); // Close the modal
  };

  return (
    <>
      <div>OPD Visit List</div>
      <div className="mt-15 min-h-screen bg-gray-100 p-6">
        <table className="w-full border-collapse shadow-md rounded-lg text-gray-900 bg-white">
          <thead>
            <tr className="bg-green-600 text-white text-left">
              <th className="p-3 text-center">Patient ID</th>
              <th className="p-3 text-center">Doctor Name</th>
              <th className="p-3 text-center">Symptoms</th>
              <th className="p-3 text-center">Diagnosis</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {opdVisits.map((visit) => (
              <tr key={visit.id} className="hover:text-green-600 border-b ali hover:bg-gray-100 transition">
                <td className="text-center"> {visit.patient_id}</td>
                <td className="text-center">{visit.doctor_name}</td>
                <td className="text-center">{visit.symptoms}</td>
                <td className="text-center">{visit.diagnosis}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(visit)} // Call handleEdit with the selected visit
                    className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(visit.id)} // Call handleDelete with the selected visit
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit OPD Visit Modal */}
        {editingVisit && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-auto text-gray-900">
              <h3 className="text-xl font-semibold mb-4 text-center text-teal-700 flex items-center justify-center gap-2">
                <FaEdit /> Edit OPD Visit Details
              </h3>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Doctor Name:</label>
                    <input
                      type="text"
                      name="doctor_name"
                      value={formData.doctor_name}
                      onChange={handleChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Symptoms:</label>
                    <input
                      type="text"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium text-gray-700">Diagnosis:</label>
                    <input
                      type="text"
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="p-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 flex items-center gap-2"
                  >
                    <FaEdit /> Save
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

    </>
  );
};

export default OPDList;





