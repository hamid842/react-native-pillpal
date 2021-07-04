import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import routes from '../navigation/routes';
import colors from '../config/colors';

const NoPatient = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>No Patient Yet!</Text>
      <Icon
        name="plus-box"
        size={35}
        color={colors.darkBlue}
        onPress={() => navigation.navigate(routes.PATIENTS)}
      />
    </View>
  );
};

export default NoPatient;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
});
