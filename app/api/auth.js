import client from './client';

const login = (username, password) =>
  client.post('/authenticate', {username, password});

export default {
  login,
};
