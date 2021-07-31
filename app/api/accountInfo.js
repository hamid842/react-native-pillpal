import client from './client';

const getAccountInfo = () => client.get('/account');
const updateAccountInfo = accountInfo => client.post(`/account`, accountInfo);

export default {getAccountInfo, updateAccountInfo};
