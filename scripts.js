const API_URL = 'http://localhost:5000/patients';

document.addEventListener('DOMContentLoaded', () => {
    fetchPatients();
});

document.getElementById('complianceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const patientId = document.getElementById('patientId').value;
    const patientName = document.getElementById('patientName').value;
    const medication = document.getElementById('medication').value;
    const diet = document.getElementById('diet').value;
    const initialPills = parseInt(document.getElementById('initialPills').value);
    const pillsPerDay = parseInt(document.getElementById('pillsPerDay').value);

    const isValid = validateForm(patientName, medication, diet, initialPills, pillsPerDay);
    if (!isValid) return;

    const remainingPills = initialPills; 
    const compliancePercentage = 100; 

    const patientData = {
        patientName,
        medication,
        diet,
        initialPills,
        pillsPerDay,
        remainingPills,
        compliancePercentage
    };

    if (patientId) {
        updatePatient(patientId, patientData);
    } else {
        addPatient(patientData);
    }

    document.getElementById('complianceForm').reset();
    document.getElementById('patientId').value = '';
});

function fetchPatients() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const patientList = document.getElementById('patientList');
            patientList.innerHTML = '';
            data.forEach(patient => {
                addPatientToList(patient);
            });
        })
        .catch(error => console.error('Error:', error));
}

function validateForm(patientName, medication, diet, initialPills, pillsPerDay) {
    let isValid = true;

    if (patientName === '') {
        showError('patientNameError', 'Patient name is required');
        isValid = false;
    } else {
        hideError('patientNameError');
    }

    if (medication === '') {
        showError('medicationError', 'Medication is required');
        isValid = false;
    } else {
        hideError('medicationError');
    }

    if (diet === '') {
        showError('dietError', 'Diet is required');
        isValid = false;
    } else {
       

