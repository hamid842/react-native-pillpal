import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import UserInfoMenu from './UserInfoMenu';
import routes from '../navigation/routes';

const Header = props => {
  const {navigation, title, account} = props;
  return (
    <View style={styles.header}>
      <View style={styles.leftButton}>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name="menu" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.rightButton}>
        <TouchableOpacity>
          <UserInfoMenu />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'dodgerblue',
  },
  title: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  rightButton: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default Header;
