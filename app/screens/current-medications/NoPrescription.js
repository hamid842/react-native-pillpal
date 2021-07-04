import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../config/colors';
import routes from '../../navigation/routes';

const NoPrescription = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.card}>
          <View>
            <Icon name="timer-sand-empty" size={40} color={colors.darkBlue} />
          </View>
        </Card.Content>
        <Card.Content style={styles.card}>
          <Text style={styles.titles}>
            {' '}
            This patient has no prescription. You can add using button below.
          </Text>
        </Card.Content>
        <Card.Content style={styles.card}>
          <View>
            <Icon
              name="plus-box"
              size={40}
              color={colors.darkBlue}
              onPress={() => navigation.navigate(routes.ADD_NEW_PRESCRIPTION)}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    backgroundColor: colors.mainGrey,
    borderRadius: 5,
  },
});
export default NoPrescription;
