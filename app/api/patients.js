import client from './client';

const getAccountPatients = id =>
  id && client.get(`/patient-infos-filter-by-account-id/${id}`);

export default {getAccountPatients};
