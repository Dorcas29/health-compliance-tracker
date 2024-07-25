const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    patientName: String,
    medication: String,
    diet: String,
    initialPills: Number,
    pillsPerDay: Number,
    remainingPills: Number,
    compliancePercentage: Number,
});

module.exports = mongoose.model('Patient', PatientSchema);

