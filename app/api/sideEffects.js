import client from './client';

const getMedicineInfo = id => client.get(`/medicines/${id}`);

export default {getMedicineInfo};
