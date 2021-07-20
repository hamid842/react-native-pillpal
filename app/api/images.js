import client from './client';
import axios from 'axios';

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

const downloadImage = (name, setImage) => {
  client
    .get(`/files/download/${name}`, {responseType: 'blob'})
    .then(res => setImage && setImage(res));
};
export default {
  uploadImage,
  downloadImage,
};
