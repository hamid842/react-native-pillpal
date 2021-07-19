import client from './client';

const uploadImage = (file, imageSourceType) => {
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
    .then(res => res.data);
};
export default {
  uploadImage,
};
