import { useState, useEffect } from "react";
import { getPatients, deletePatient, updatePatient } from "../services/patientService"; // Import updatePatient
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  // Fetch patients from the API
  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Delete patient from the list
  const handleDelete = async (id) => {
    try {
      // Delete from the server first
      await deletePatient(id);

      // After successful deletion, update the state to reflect the change
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("the patient is linked to OPDVisit");  // Custom message from backend
      } else {
        console.error("Error deleting patient:", error);
        alert("An error occurred while deleting the patient.");
      }
    }
  };

  // Edit patient logic
  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setFormData({ ...patient });
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save edited patient
  const handleSave = async () => {
    try {
      await updatePatient(editingPatient.id, formData);
      alert("Patient updated successfully!");
      setEditingPatient(null); // Close the modal
      fetchPatients(); // Re-fetch the patient list
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    }
  };

  // Cancel the edit and close the modal
  const handleCancel = () => {
    setEditingPatient(null);
  };

  return (
    <>
      <div>PatientList</div>
      <div className="mt-15 min-h-screen bg-gray-100 p-6">

        <table className="w-full border-collapse shadow-md rounded-lg text-gray-900 bg-white">
          <thead>
            <tr className="bg-green-600 text-white text-left">
              <th className="p-3 text-center ">Name</th>
              <th className="p-3 text-center ">ABHA Number</th>
              <th className="p-3 text-center ">Gender</th>
              <th className="p-3 text-center ">DOB</th>
              <th className="p-3 text-center ">Phone</th>
              <th className="p-3 text-center ">Email</th>
              <th className="p-3 text-center ">Address</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:text-green-600 border-b hover:bg-gray-100 transition">
                <td className="text-center">{patient.name}</td>
                <td className="text-center"> {patient.abha_number}</td>
                <td className="text-center">{patient.gender}</td>
                <td className="text-center">{patient.dob}</td>
                <td className="text-center">{patient.phone}</td>
                <td className="text-center">{patient.email}</td>
                <td className="text-center">{patient.address}</td>
                <td className="p-3 flex justify-center gap-3 text-center">
                  <button
                    onClick={() => handleEdit(patient)}
                    className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Patient Modal */}
        {editingPatient !== null && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-auto text-gray-900">
              <h3 className="text-xl font-semibold mb-4 text-center text-teal-700 flex items-center justify-center gap-2">
                <FaEdit /> Edit Patient Details
              </h3>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(formData).map((key, index) => (
                    <div key={index} className="flex flex-col">
                      <label className="font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                      </label>
                      <input
                        type={key === "dob" ? "date" : "text"}
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
    </>
  );
};

export default PatientList;


