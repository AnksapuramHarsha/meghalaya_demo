import axios from "axios";


const API_URL = "http://localhost:5000/api/patients";
// const API_URL = "http://54.169.168.155:5000/api/patients";

// Get all patients
export const getPatients = async () => {
  return await axios.get(API_URL);
};

// Get a single patient by ID
export const getPatientById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// Create a new patient
export const createPatient = async (patientData) => {
  return await axios.post(API_URL, patientData);
};

// Update a patient
export const updatePatient = async (id, patientData) => {
  return await axios.put(`${API_URL}/${id}`, patientData);
};

// Delete a patient
export const deletePatient = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
