import client from './client';

const getPatientPrescriptions = id =>
  client.get(`/prescriptions-filter-by-patient-id/${id}`);

export default {getPatientPrescriptions};
