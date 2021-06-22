import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CurrentMedications from '../screens/current-medications/CurrentMedications'
import Patients from '../screens/patients/Patients'
import Prescriptions from '../screens/prescriptions/Prescriptions'
import Profile from '../screens/profile/Profile'
import AddNewPrescription from '../screens/add-new-prescription/AddNewPrescription'

const Drawer = createDrawerNavigator();

const AppNavigator=()=> {
  return (
      <Drawer.Navigator initialRouteName="Current-Medications">
        <Drawer.Screen name="Current-Medications" component={CurrentMedications} />
        <Drawer.Screen name="Patients" component={Patients} />
        <Drawer.Screen name="Prescriptions" component={Prescriptions} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Add-New-Prescription" component={AddNewPrescription} />
      </Drawer.Navigator>
  );
}

export default AppNavigator;