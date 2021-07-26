import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../config/colors';
import images from '../../api/images';
import AppImagePicker from '../../components/AppImagePicker';
import useApi from '../../hooks/useApi';
import {setImage} from '../../redux/reducers/images/images-reducer';

const ProfileTop = props => {
  const imageDownloadApi = useApi(images.downloadImage);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const getImage = async () => {
      imageUri && (await imageDownloadApi.request(imageUri, setImage));
    };
    getImage();
    props.setImage(image, 'profile');
  }, [imageUri, image]);

  return (
    <>
      <View style={styles.container}>
        <Image
          source={image ? {uri: image} : require('../../assets/hamid.png')}
          style={styles.image}
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
            setImageUri={setImageUri}
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
});

const mapStateToProps = ({images, login}) => ({
  account: login.account,
  profileImage: images.profileImage,
});

export default connect(mapStateToProps, {setImage})(ProfileTop);
