import client from './client';

const getPatientPrescriptions = id =>
  client.get(`/prescriptions-filter-by-patient-id/${id}`);

const createNewPrescription = data => client.post('/prescriptions', data);

export default {getPatientPrescriptions, createNewPrescription};
