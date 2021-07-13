import React, {useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppImagePicker from '../../components/AppImagePicker';

import colors from '../../config/colors';

const ProfileTop = props => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../../assets/hamid.png')}
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
            state="medicImageUrl"
            // setImageUri={setImageUri}
            visible={modalVisible}
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
          {/* <Icon name="camera" size={25} color={colors.white} /> */}
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

export default ProfileTop;
