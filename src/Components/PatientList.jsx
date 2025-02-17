import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { MdOutlineList } from "react-icons/md";

const initialPatients = [
  {
    name: "John Doe",
    abhaNumber: "98765432101234",
    gender: "Male",
    dob: "1990-05-15",
    phone: "6309392273",
    email: "johndoe@example.com",
    address: "123 Main St, Springfield",
  },
  {
    name: "Jane Smith",
    abhaNumber: "87654321098765",
    gender: "Female",
    dob: "1985-10-25",
    phone: "8328317313",
    email: "janesmith@example.com",
    address: "456 Elm St, Metropolis",
  },
  {
    name: "Alice Johnson",
    abhaNumber: "76543210987654",
    gender: "Female",
    dob: "1995-08-30",
    phone: "9701783765",
    email: "alicejohnson@example.com",
    address: "789 Oak St, Gotham",
  },
];

const PatientList = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleEdit = (index) => {
    setEditingPatient(index);
    setFormData({ ...patients[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedPatients = [...patients];
    updatedPatients[editingPatient] = formData;
    setPatients(updatedPatients);
    setEditingPatient(null);
    toast.success("Patient saved successfully!");
  };

  const handleCancel = () => {
    setEditingPatient(null);
    toast.success("Edit canceled successfully");
  };

  const handleDelete = () => {
    setPatients(patients.filter((_, i) => i !== deleteIndex));
    toast.success("Patient deleted successfully!");
    setDeleteIndex(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl border border-gray-300 p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700 flex items-center justify-center gap-2">
          <MdOutlineList className="text-3xl" /> Patient List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-md rounded-lg text-gray-900 bg-white">
            <thead>
              <tr className="bg-green-600 text-white text-left">
                <th className="p-3">Name</th>
                <th className="p-3">ABHA Number</th>
                <th className="p-3">Gender</th>
                <th className="p-3">DOB</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3">Address</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="hover:text-green-600 border-b hover:bg-gray-100 transition">
                  {Object.values(patient).map((value, i) => (
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
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <h3 className="text-xl font-semibold text-red-600 mb-4">⚠️ Confirm Delete</h3>
              <p>Are you sure you want to delete this patient?</p>
              <div className="flex justify-center gap-4 mt-4">
                <button onClick={handleDelete} className="p-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600">Yes</button>
                <button onClick={() => setDeleteIndex(null)} className="p-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600">No</button>
              </div>
            </div>
          </div>
        )}

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
    </div>
  );
};

export default PatientList;
