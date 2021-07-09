import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';
import Barcode from 'react-native-barcode-builder';
import dayjs from 'dayjs';

import colors from '../../config/colors';

const PrescriptionDetails = ({prescription}) => {
  return (
    <View style={styles.container}>
      <View style={styles.barcode}>
        <Barcode
          value={prescription?.barCode}
          background="transparent"
          width={0.85}
          height={50}
          text={prescription?.barCode}
        />
      </View>
      <View>
        <Text style={styles.name}>Prescription Information</Text>
        <View style={styles.presInfo}>
          <Text style={styles.name}>{prescription?.prescriptionCode}</Text>
          <Text>{prescription?.medicType}</Text>
          <Text style={styles.desc}>{prescription?.usageDescription}</Text>
          <Divider style={{marginVertical: 5}} />
          <Text style={styles.importantInfo}>Important Information</Text>
          <Text>{prescription?.importantInfo}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.name}>Pharmacy & Refill Information</Text>
        <View style={styles.presInfo}>
          <Text style={styles.name}>Refill Time</Text>
          <Text>
            {dayjs(prescription?.refillTime).format('YYYY-MM-DD HH:mm')}
          </Text>
          <Divider style={{marginVertical: 5}} />
          <Text style={styles.name}>Pharmacy</Text>
        </View>
      </View>
    </View>
  );
};

export default PrescriptionDetails;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#ead055',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  barcode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  presInfo: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    borderColor: colors.darkBlue,
    marginVertical: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  desc: {
    color: 'gray',
  },
  importantInfo: {
    fontWeight: 'bold',
    color: colors.danger,
  },
});
