import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import routes from '../../navigation/routes';

const NoPatient = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>No Patient Yet!</Text>
      <Text>To add patient press the button below</Text>
      <Icon
        name="plus-box"
        size={40}
        color={colors.mainBlue}
        onPress={() => navigation.navigate(routes.PATIENTS)}
      />
    </View>
  );
};

export default NoPatient;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 150,
    alignSelf: 'center',
    flexDirection: 'column',

    backgroundColor: colors.mainGrey,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
