import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Alert, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../config/colors';
import images from '../../api/images';
import AppImagePicker from '../../components/AppImagePicker';
import useApi from '../../hooks/useApi';
import RenderImage from '../../components/RenderImage';
import accountInfo from '../../api/accountInfo';
import {setImage} from '../../redux/reducers/images/images-reducer';

const ProfileTop = props => {
  const {account} = props;
  const updateAccountApi = useApi(accountInfo.updateAccountInfo);
  const imageDownloadApi = useApi(images.downloadImage);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState('');
  const [downloadedImage, setDownloadedImage] = useState('');

  const updateAccount = async () => {
    const result = await updateAccountApi.request({
      ...account,
      imageUrl: uploadedImageName,
    });
    if (result.ok) {
      Alert.alert('Image Uploaded.');

      await imageDownloadApi.request(uploadedImageName, setDownloadedImage);
    } else {
      Alert.alert('Something went wrong!');
    }
  };

  useEffect(() => {
    if (uploadedImageName) updateAccount();
    return () => setUploadedImageName('');
  }, [uploadedImageName]);

  useEffect(() => {
    downloadedImage && props.setImage(downloadedImage, 'profile');
  }, [downloadedImage]);

  return (
    <>
      <View style={styles.container}>
        <RenderImage
          image={props.profileImage || downloadedImage}
          imageStyle={styles.image}
          containerStyle={styles.imageContainer}
        />
        <View style={styles.iconContainer}>
          <Icon
            name="lock"
            size={25}
            color={colors.white}
            onPress={props.onPressLock && props.onPressLock}
          />
          <Icon
            name="account-edit"
            size={25}
            color={colors.white}
            onPress={props.onPressEdit && props.onPressEdit}
          />
          <AppImagePicker
            imageSourceType="profile"
            visible={modalVisible}
            setImageUri={setUploadedImageName}
            onRequestClose={() => setModalVisible(!modalVisible)}
            onPressCancel={() => setModalVisible(!modalVisible)}
            renderComponent={
              <Icon
                name="camera"
                size={25}
                color={colors.white}
                onPress={() => setModalVisible(!modalVisible)}
              />
            }
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 170,
    backgroundColor: colors.bgGrey,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 15,
  },
  iconContainer: {
    width: '80%',
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-around',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 15,
    backgroundColor: colors.mediumGrey,
  },
});

const mapStateToProps = ({login, images}) => ({
  profileImage: images.profileImage,
  account: login.account,
});

export default connect(mapStateToProps, {setImage})(ProfileTop);
