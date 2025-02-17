import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes, FaClipboardList } from "react-icons/fa";
import toast from "react-hot-toast";

const initialOpdList = [
  { patient: "Abhilash", doctor: "Dr. Ravinder", symptoms: "Light Fever", diagnosis: "Viral Fever" },
  { patient: "Sonia", doctor: "Dr. Mehta", symptoms: "Headache, Fatigue", diagnosis: "Migraine" },
  { patient: "Rajesh", doctor: "Dr. Sharma", symptoms: "Cough, Cold", diagnosis: "Common Cold" },
  { patient: "Priya", doctor: "Dr. Nandini", symptoms: "Chest Pain, Shortness of Breath", diagnosis: "Mild Bronchitis" },
  { patient: "Vikram", doctor: "Dr. Verma", symptoms: "Stomach Pain, Nausea", diagnosis: "Gastritis" },
];

const OpdList = () => {
  const [opdList, setOpdList] = useState(initialOpdList);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData({ ...opdList[index] });
  };

  const handleDelete = () => {
    setOpdList(opdList.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
    toast.success("OPD deleted successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedList = [...opdList];
    updatedList[editingIndex] = formData;
    setOpdList(updatedList);
    setEditingIndex(null);
    toast.success("OPD updated successfully!");
  };

  const handleCancel = () => {
    setEditingIndex(null);
    toast.success("Edit canceled successfully!");
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
    toast.success("Delete action canceled!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl border border-gray-300 p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700 flex items-center justify-center gap-2">
          <FaClipboardList className="text-3xl" /> OPD List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-md rounded-lg text-gray-900 bg-white">
            <thead>
              <tr className="bg-green-600 text-white text-left">
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Symptoms</th>
                <th className="p-3">Diagnosis</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {opdList.map((opd, index) => (
                <tr key={index} className="hover:text-green-600 border-b hover:bg-gray-100 transition">
                  {Object.values(opd).map((value, i) => (
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

        {/* Edit Modal */}
        {editingIndex !== null && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-auto text-gray-900">
              <h3 className="text-xl font-semibold mb-4 text-center text-teal-700 flex items-center justify-center gap-2">
                <FaEdit /> Edit OPD Record
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(formData).map((key, index) => (
                    <div key={index} className="flex flex-col">
                      <label className="font-medium text-gray-700">{key.toUpperCase()}:</label>
                      <input type="text" name={key} value={formData[key]} onChange={handleChange} className="p-2 border rounded focus:ring-2 focus:ring-teal-500" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button type="button" onClick={handleSave} className="p-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 flex items-center gap-2">
                    <FaSave /> Save
                  </button>
                  <button type="button" onClick={handleCancel} className="p-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 flex items-center gap-2">
                    <FaTimes /> Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {deleteIndex !== null && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <h3 className="text-xl font-semibold text-red-600 mb-4">⚠️ Confirm Delete</h3>
              <p>Are you sure you want to delete this OPD record?</p>
              <div className="flex justify-center gap-4 mt-4">
                <button onClick={handleDelete} className="p-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600">Yes</button>
                <button onClick={handleCancelDelete} className="p-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600">No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpdList;
