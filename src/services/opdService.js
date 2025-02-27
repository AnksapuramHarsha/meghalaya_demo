import axios from "axios";
import { API_CONFIG } from "../config";

const API_URL = `http://${API_CONFIG.ipAddress}:${API_CONFIG.port}/api/opd`;

// Get all OPD visits
export const getOPDVisits = async () => {
  return await axios.get(API_URL);
};

// Get a single OPD visit by ID
export const getOPDVisitById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// Create a new OPD visit
export const createOPDVisit = async (opdData) => {
  return await axios.post(API_URL, opdData);
};

// Update an OPD visit
export const updateOPDVisit = async (id, opdData) => {
  console.log(`Updating OPD visit with ID: ${id}`);
  return await axios.put(`${API_URL}/${id}`, opdData);

};

// Delete an OPD visit
export const deleteOPDVisit = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
