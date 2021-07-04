import client from './client';

const getPatientMedications = id =>
  client.get(`/prescriptions-filter-by-patient-id/${id}`);

export default {getPatientMedications};
