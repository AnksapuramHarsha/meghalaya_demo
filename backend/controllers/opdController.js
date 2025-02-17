const { OPDVisit, Patient } = require("../models");
const { body, param, validationResult } = require("express-validator");

// Middleware for validating OPD Visit fields
const validateOPDVisit = [
  body("patient_id").isInt().withMessage("Patient ID must be an integer."),
  body("doctor_name").isString().notEmpty().withMessage("Doctor name is required."),
  body("symptoms").isString().notEmpty().withMessage("Symptoms are required."),
  body("diagnosis").isString().notEmpty().withMessage("Diagnosis is required."),
];

// Get All OPD Visits (No Timestamps)
exports.getAllOPDVisits = async (req, res) => {
  try {
    const opdVisits = await OPDVisit.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(opdVisits);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch OPD visits" });
  }
};

// Get a Single OPD Visit by ID
exports.getOPDVisitById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const opdVisit = await OPDVisit.findByPk(id, {
      include: [{ model: Patient, attributes: ["name", "id"] }],
    });
    if (!opdVisit) return res.status(404).json({ error: "OPD Visit not found" });

    res.status(200).json(opdVisit);
  } catch (error) {
    console.error("Error fetching OPD visit:", error);
    res.status(500).json({ error: "Failed to fetch OPD visit" });
  }
};


// Create an OPD Visit
exports.createOPDVisit = [
  validateOPDVisit,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { patient_id, doctor_name, symptoms, diagnosis } = req.body;

      const patientExists = await Patient.findByPk(patient_id);
      if (!patientExists) {
        return res.status(404).json({ error: "Patient not found." });
      }

      const newOPDVisit = await OPDVisit.create({
        patient_id,
        doctor_name,
        symptoms,
        diagnosis,
      });

      res.status(201).json(newOPDVisit);
    } catch (error) {
      console.error("Error creating OPD Visit:", error);
      res.status(500).json({ error: "Failed to create OPD visit", details: error.message });
    }
  },
];

// Update an OPD Visit
exports.updateOPDVisit = async (req, res) => {
  try {
    // Extract patient_id from the URL params (e.g., /opd/:id)
    const { id } = req.params;  // This is the patient_id
    
    // Extract other fields to update from the request body
    const { doctor_name, symptoms, diagnosis } = req.body;

    // Find the OPD visit using the patient_id (id)
    const opdVisit = await OPDVisit.findByPk(id);
    if (!opdVisit) {
      return res.status(404).json({ error: `OPD Visit with Patient ID ${id} not found.` });  // If not found, return 404
    }

    // Update the OPD visit record with the new fields
    await opdVisit.update({ doctor_name, symptoms, diagnosis });

    // Send back the updated OPD visit details
    res.status(200).json(opdVisit);
  } catch (error) {
    console.error("Error updating OPD Visit:", error);
    res.status(500).json({ error: "Failed to update OPD visit", details: error.message });  // If server error occurs
  }
};



// Delete an OPD Visit
exports.deleteOPDVisit = [
  param("id").isInt().withMessage("ID must be an integer."),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const opdVisit = await OPDVisit.findByPk(req.params.id);
      if (!opdVisit) return res.status(404).json({ error: "OPD visit not found" });

      await opdVisit.destroy();
      res.json({ message: "OPD visit deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete OPD visit" });
    }
  },
];