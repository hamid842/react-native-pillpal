import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {DataTable, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../config/colors';
import users from '../../api/users';

const Devices = ({account, setShowSuccessSnackbar, setShowErrorSnackbar}) => {
  const [devices, setDevices] = useState();

  const deleteDeviceAlert = (name, id) =>
    Alert.alert('Sure', `want to delete this device ? (${name})`, [
      {
        text: 'No',
        // onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => handleDeleteDevice(id)},
    ]);

  const handleDeleteDevice = async id => {
    const result = await users.deleteDevice(id);
    if (result.ok) {
      await setShowSuccessSnackbar(true);
      await getDevicesList(account?.id);
    } else {
      setShowErrorSnackbar(true);
    }
  };

  const getDevicesList = async id => {
    const result = await users.getDevices(id);
    if (result.ok) setDevices(result.data);
    if (!result.ok) return;
  };

  useEffect(() => {
    getDevicesList(account?.id);
  }, [account?.id]);

  return (
    <Card style={styles.card}>
      <View>
        <Text style={styles.tableTitle}>Devices</Text>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Model</DataTable.Title>
          <DataTable.Title>Serial No.</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>
        {devices ? (
          devices?.map((device, i) => (
            <DataTable.Row key={i}>
              <DataTable.Cell>{device?.name}</DataTable.Cell>
              <DataTable.Cell>{device?.model}</DataTable.Cell>
              <DataTable.Cell>{device?.serialNo}</DataTable.Cell>
              <DataTable.Cell style={styles.action}>
                <Icon
                  name="delete-outline"
                  size={30}
                  color={colors.danger}
                  onPress={() => deleteDeviceAlert(device?.name, device?.id)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))
        ) : (
          <DataTable.Row>
            <Text>No Device found!</Text>
          </DataTable.Row>
        )}
      </DataTable>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.mainGrey,
  },
  tableTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  action: {
    justifyContent: 'center',
  },
});

const mapStateToProps = ({login}) => ({
  account: login.account,
});

export default connect(mapStateToProps, {})(Devices);
