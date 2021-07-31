import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CurrentMedications from '../screens/current-medications/CurrentMedications';
import Patients from '../screens/patients/Patients';
import Prescriptions from '../screens/prescriptions/Prescriptions';
import Profile from '../screens/profile/Profile';
import AddNewPrescription from '../screens/add-new-prescription/AddNewPrescription';
import useAuth from '../auth/useAuth';
import RenderImage from '../components/RenderImage';
import colors from '../config/colors';

const Drawer = createDrawerNavigator();

const DrawerContent = props => {
  const auth = useAuth();

  return (
    <>
      <View style={styles.drawerHeader}>
        <View style={{width: 100, alignSelf: 'center'}}>
          <RenderImage
            image={props.profileImage}
            imageStyle={styles.drawerProfilePhoto}
            containerStyle={styles.imageContainer}
          />
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <DrawerItemList activeBackgroundColor={'transparent'} {...props} />
        <DrawerItem label="Logout" onPress={() => auth.logOut()} />
      </DrawerContentScrollView>
    </>
  );
};

const AppNavigator = props => {
  const {profileImage} = props;
  return (
    <Drawer.Navigator
      initialRouteName="Current-Medications"
      drawerContent={drawerProps => (
        <DrawerContent {...drawerProps} profileImage={profileImage} />
      )}>
      <Drawer.Screen
        name="Current-Medications"
        component={CurrentMedications}
        options={{title: 'Current-Medications'}}
      />
      <Drawer.Screen name="Patients" component={Patients} />
      <Drawer.Screen name="Prescriptions" component={Prescriptions} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen
        name="Add-New-Prescription"
        component={AddNewPrescription}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    height: 170,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    margin: 0,
  },
  drawerProfilePhoto: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  imageContainer: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: colors.mediumGrey,
    overflow: 'hidden',
  },
  profileCamera: {
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  logo: {
    alignItems: 'center',
  },
  logo: {
    alignSelf: 'center',
  },
});

const mapStateToProps = ({images}) => ({
  profileImage: images.profileImage,
});

export default connect(mapStateToProps, {})(AppNavigator);
