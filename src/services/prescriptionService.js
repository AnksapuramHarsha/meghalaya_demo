import axios from "axios";
import { API_CONFIG } from "../config";

const API_URL = `http://${API_CONFIG.ipAddress}:${API_CONFIG.port}/api/prescriptions`;

// Get all prescriptions
export const getPrescriptions = async () => {
  return await axios.get(API_URL);
};

// Get a single prescription by ID
export const getPrescriptionById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// Create a new prescription
export const createPrescription = async (prescriptionData) => {
  console.log("📤 Sending data to backend:", prescriptionData); // ✅ Debugging
  try {
    const response = await axios.post(API_URL, prescriptionData);
    console.log("✅ Prescription added:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error adding prescription:", error.response ? error.response.data : error.message);
    throw error;
  }
};
// Update a prescription
export const updatePrescription = async (id, prescriptionData) => {
  return await axios.put(`${API_URL}/${id}`, prescriptionData);
};

// Delete a prescription
export const deletePrescription = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
