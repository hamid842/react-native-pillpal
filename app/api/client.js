import {create} from 'apisauce';
import cache from '../utility/cache';
import authStorage from '../auth/storage';

// import settings from "../config/settings";

const apiClient = create({
  // baseURL: 'https://mjv-703-demo-service-iii.herokuapp.com/api',
  baseURL: 'http://192.168.1.3:8080/api',
});

apiClient.addAsyncRequestTransform(async request => {
  const authToken = await authStorage.getToken();
  if (!authToken) {
    return;
  } else if (request) {
    request.headers['Authorization'] = `Bearer ${authToken}`;
  }
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? {ok: true, data} : response;
};

export default apiClient;
