const express = require('express');
const Patient = require('../models/Patient');
const router = express.Router();

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new patient
router.post('/', async (req, res) => {
    const patient = new Patient({
        patientName: req.body.patientName,
        medication: req.body.medication,
        diet: req.body.diet,
        initialPills: req.body.initialPills,
        pillsPerDay: req.body.pillsPerDay,
        remainingPills: req.body.initialPills,
        compliancePercentage: 100,
    });

    try {
        const newPatient = await patient.save();
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a patient
router.put('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        patient.patientName = req.body.patientName;
        patient.medication = req.body.medication;
        patient.diet = req.body.diet;
        patient.initialPills = req.body.initialPills;
        patient.pillsPerDay = req.body.pillsPerDay;
        patient.remainingPills = req.body.remainingPills;
        patient.compliancePercentage = req.body.compliancePercentage;

        const updatedPatient = await patient.save();
        res.json(updatedPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        await patient.remove();
        res.json({ message: 'Patient deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

