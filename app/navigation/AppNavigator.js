import * as React from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CurrentMedications from '../screens/current-medications/CurrentMedications';
import Patients from '../screens/patients/Patients';
import Prescriptions from '../screens/prescriptions/Prescriptions';
import Profile from '../screens/profile/Profile';
import AddNewPrescription from '../screens/add-new-prescription/AddNewPrescription';
import useAuth from '../auth/useAuth';

const Drawer = createDrawerNavigator();

const DrawerContent = props => {
  const auth = useAuth();
  return (
    <>
      <View style={styles.drawerHeader}>
        <View style={{width: 100, alignSelf: 'center'}}>
          <Image
            source={require('../assets/hamid.png')}
            style={styles.drawerProfilePhoto}
          />
          <TouchableOpacity
            style={styles.profileCamera}
            onPress={() => {
              // // Call the toggleCamera passed by DrawerNav
              // props.toggleCamera && props.toggleCamera();
            }}>
            <Icon name="camera" size={40} color="#22222288" />
          </TouchableOpacity>
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

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Current-Medications"
      drawerContent={drawerProps => <DrawerContent {...drawerProps} />}>
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

export default AppNavigator;
