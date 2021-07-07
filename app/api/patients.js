import client from './client';

const getAccountPatients = id =>
  client.get(`/patient-infos-filter-by-account-id/${id}`);
const deletePatient = id => client.delete(`/patient-infos/${id}`);
const createPatient = patientInfo => client.post(`/patient-infos`, patientInfo);
const editPatient = (id, patientInfo) =>
  client.put(`/patient-infos/${id}`, patientInfo);

export default {getAccountPatients, deletePatient, createPatient, editPatient};
