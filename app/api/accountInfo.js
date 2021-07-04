import client from './client';

const getAccountInfo = () => client.get('/account');

export default {getAccountInfo};
