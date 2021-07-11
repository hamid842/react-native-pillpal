import client from './client';

const register = userInfo => client.post('/register', userInfo);
const getUserInfos = id => client.get(`/user-infos/${id}`);
const getDevices = id =>
  client.get(`/mobile-devices-filter-by-account-id/${id}`);

export default {register, getUserInfos, getDevices};
