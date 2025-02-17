const { Patient } = require("../models");
const {OPDVisit}=require("../models")

const validatePatientData = (data) => {
  const errors = [];

  // Name validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push("Name is required");
  }

  // ABHA number validation (assuming it should be a 14-digit number)
  if (!data.abha_number || !/^\d{14}$/.test(data.abha_number)) {
    errors.push("Invalid ABHA number format. Must be 14 digits");
  }

  // Gender validation
  const validGenders = ['male', 'female', 'other'];
  if (!data.gender || !validGenders.includes(data.gender.toLowerCase())) {
    errors.push("Invalid gender. Must be 'male', 'female', or 'other'");
  }

  // DOB validation
  const dobDate = new Date(data.dob);
  if (!data.dob || dobDate.toString() === 'Invalid Date' || dobDate > new Date()) {
    errors.push("Invalid date of birth");
  }

  // Phone validation
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!data.phone || !phoneRegex.test(data.phone)) {
    errors.push("Invalid phone number. Must be a 10-digit Indian mobile number");
  }

  // Email validation (optional)
  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email.length > 40) {
      errors.push("Email address cannot exceed 40 characters");
    }
    if (!emailRegex.test(data.email)) {
      errors.push("Invalid email format");
    }
  }

  // Address validation
  if (!data.address || data.address.trim().length < 5) {
    errors.push("Address must be at least 5 characters long");
  }

  return errors;
};

// Get All Patients (No Timestamps)
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

// Get a Single Patient by ID
exports.getPatientById = async (req, res) => {
  try {
    if (!req.params.id || isNaN(req.params.id)) {
      return res.status(400).json({ error: "Invalid patient ID" });
    }

    const patient = await Patient.findByPk(req.params.id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ error: "Failed to fetch patient" });
  }
};

// Create a New Patient
exports.createPatient = async (req, res) => {
  try {
    const validationErrors = validatePatientData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const { name, abha_number, gender, dob, phone, email, address } = req.body;

    // Check if ABHA number is already registered
    const existingPatient = await Patient.findOne({ where: { abha_number } });
    if (existingPatient) {
      return res.status(400).json({ error: "Patient with this ABHA number already exists" });
    }

    // Create a new patient entry
    const newPatient = await Patient.create({
      name,
      abha_number,
      gender: gender.toLowerCase(),
      dob,
      phone,
      email,
      address
    });

    res.status(201).json({
      message: "Patient registered successfully",
      patient: newPatient
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Failed to create patient" });
  }
};

// Update a Patient
exports.updatePatient = async (req, res) => {
  try {
    if (!req.params.id || isNaN(req.params.id)) {
      return res.status(400).json({ error: "Invalid patient ID" });
    }

    const validationErrors = validatePatientData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const { name, abha_number, gender, dob, phone, email, address } = req.body;
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    // Check if new ABHA number conflicts with existing patient
    if (abha_number !== patient.abha_number) {
      const existingPatient = await Patient.findOne({ where: { abha_number } });
      if (existingPatient) {
        return res.status(400).json({ error: "Patient with this ABHA number already exists" });
      }
    }

    await patient.update({
      name,
      abha_number,
      gender: gender.toLowerCase(),
      dob,
      phone,
      email,
      address
    });
    res.json({ message: "Patient updated successfully", patient });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ error: "Failed to update patient" });
  }
};

// Delete a Patient
// exports.deletePatient = async (req, res) => {
//   try {
//     if (!req.params.id || isNaN(req.params.id)) {
//       return res.status(400).json({ error: "Invalid patient ID" });
//     }

//     const patient = await Patient.findByPk(req.params.id);
//     if (!patient) return res.status(404).json({ error: "Patient not found" });

//     await patient.destroy();
//     res.json({ message: "Patient deleted successfully" });
//   } catch (error) {
//     if (error.code === '23503') {
//       return res.status(400).json({
//         message: `The patient cannot be deleted because they are referenced by other records (e.g., opd_visits).`
//       });
//     }
//     console.error("Error deleting patient:", error);
//     res.status(500).json({ error: "Failed to delete patient" });
//   }
// };
const { OpdVisit } = require('../models');  // Import OpdVisit model

exports.deletePatient = async (req, res) => {
  try {
    // Validate patient ID
    if (!req.params.id || isNaN(req.params.id)) {
      return res.status(400).json({ error: "Invalid patient ID" });
    }

    // Fetch the patient
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check if there are any related records in opd_visits
    const relatedVisits = await OPDVisit.findAll({ where: { patient_id: req.params.id } });
    if (relatedVisits.length > 0) {
      return res.status(409).json({
        message: "The patient cannot be deleted because they are referenced by one or more visits."
      });
    }

    // Proceed with deletion if no related records are found
    await patient.destroy();
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    // Log the full error for better debugging
    console.error("Error deleting patient:", error);

    // Handle foreign key constraint error (PostgreSQL specific: '23503')
    if (error.code === '23503') {
      return res.status(409).json({
        message: "The patient cannot be deleted because they are referenced by other records (e.g., opd_visits)."
      });
    }

    // General error response
    res.status(500).json({ error: "Failed to delete patient" });
  }
};




