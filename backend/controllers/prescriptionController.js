const { Prescription, Patient, OPDVisit } = require("../models");
const { body, validationResult } = require("express-validator");

// Middleware for prescription validation
const validatePrescription = [
  body("patient_id").notEmpty().withMessage("Patient ID is required"),
  body("opd_id").notEmpty().withMessage("OPD ID is required"),
  body("medication").trim().notEmpty().withMessage("Medication name is required"),
  body("dosage").trim().notEmpty().withMessage("Dosage is required"),
  body("frequency").trim().notEmpty().withMessage("Frequency is required"),
  body("duration").trim().notEmpty().withMessage("Duration is required"),
];

// Get All Prescriptions (No Timestamps)
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prescriptions" });
  }
};

// Get a Single Prescription by ID
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findByPk(req.params.id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!prescription) return res.status(404).json({ error: "Prescription not found" });
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prescription" });
  }
};

// Create a Prescription
exports.createPrescription = [
  validatePrescription,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log("Received request body:", req.body);
      const { patient_id, opd_id, medication, dosage, frequency, duration } = req.body;

      // Check if patient exists
      const patientExists = await Patient.findByPk(patient_id);
      if (!patientExists) return res.status(404).json({ error: "Patient not found" });

      // Check if OPD Visit exists
      const opdExists = await OPDVisit.findByPk(opd_id);
      if (!opdExists) return res.status(404).json({ error: "OPD Visit not found" });

      // Create new prescription
      const newPrescription = await Prescription.create({
        patient_id,
        opd_id,
        medication,
        dosage,
        frequency,
        duration,
      });

      res.status(201).json(newPrescription);
    } catch (error) {
      console.error("Error creating prescription:", error);
      res.status(500).json({ error: "Failed to create prescription" });
    }
  },
];

// Update a Prescription
exports.updatePrescription = [
  validatePrescription,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { medication, dosage, frequency, duration } = req.body;
      const prescription = await Prescription.findByPk(req.params.id);
      if (!prescription) return res.status(404).json({ error: "Prescription not found" });

      await prescription.update({ medication, dosage, frequency, duration });
      res.json({ message: "Prescription updated successfully", prescription });
    } catch (error) {
      res.status(500).json({ error: "Failed to update prescription" });
    }
  },
];

// Delete a Prescription
exports.deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByPk(req.params.id);
    if (!prescription) return res.status(404).json({ error: "Prescription not found" });

    await prescription.destroy();
    res.json({ message: "Prescription deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete prescription" });
  }
};
