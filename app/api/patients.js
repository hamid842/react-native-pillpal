import client from './client';

const getAccountPatients = id =>
  client.get(`/patient-infos-filter-by-account-id/${id}`);

export default {getAccountPatients};
