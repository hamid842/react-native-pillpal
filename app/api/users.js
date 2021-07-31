import client from './client';

const register = userInfo => client.post('/register', userInfo);
const getUserInfos = id => client.get(`/user-infos/${id}`);
const editUserInfos = (id, userInfo) =>
  client.put(`/user-infos/${id}`, userInfo);
const getDevices = id =>
  client.get(`/mobile-devices-filter-by-account-id/${id}`);

const changePassword = passwords =>
  client.post('account/change-password', passwords);

const deleteDevice = id => client.delete(`/mobile-devices/${id}`);

const activeAccount = key => client.get(`/activate?key=${key}`);

export default {
  register,
  getUserInfos,
  getDevices,
  changePassword,
  deleteDevice,
  editUserInfos,
  activeAccount,
};
