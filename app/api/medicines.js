import client from './client';

const getAllMedicines = id => client.get(`/medicines/${id}`);

export default {getAllMedicines};
