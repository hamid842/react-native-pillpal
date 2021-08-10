import client from './client';

const getAllPharmacies = () => client.get(`/pharmacies`);

export default {getAllPharmacies};
