import client from './client';
import apisauce from 'apisauce';
import storage from '../auth/storage';

const uploadImage = (file, imageSourceType, setImageUri) => {
  var photo = {
    uri: file,
    type: 'image/jpeg',
    name: 'photo.jpg',
  };
  const data = new FormData();
  data.append('file', photo);
  client
    .post(`/files/upload?imageSourceType=${imageSourceType}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => setImageUri && setImageUri(res.data));
};

const api = apisauce.create({
  // baseURL: 'https://mjv-703-demo-service-iii.herokuapp.com/api',
  baseURL: 'http://192.168.1.3:8080/api',
  responseType: 'blob',
});

api.addAsyncRequestTransform(async request => {
  const authToken = await storage.getToken();
  if (!authToken) {
    return;
  } else if (request) {
    request.headers['Authorization'] = `Bearer ${authToken}`;
    request.headers['Content-Type'] = 'multipart/form-data';
  }
});
const downloadImage = (name, setImage) => {
  api.get(`/files/download/${name}`).then(res => {
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(res.data);
    fileReaderInstance.onload = () => {
      base64data = fileReaderInstance.result;
      setImage(base64data);
    };
  });
};
export default {
  uploadImage,
  downloadImage,
};
