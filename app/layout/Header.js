import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import colors from '../config/colors';

import UserInfoMenu from './UserInfoMenu';

const Header = props => {
  const {navigation, title, selectedPatientFromTopMenu} = props;
  return (
    <View style={styles.header}>
      <View style={styles.leftButton}>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name="menu" size={30} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.titleText}>
          Patient :
          <Text
            style={
              styles.name
            }>{`  ${selectedPatientFromTopMenu?.firstName} ${selectedPatientFromTopMenu?.lastName}`}</Text>
        </Text>
      </View>
      <View style={styles.rightButton}>
        <TouchableOpacity>
          <UserInfoMenu navigation={navigation} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'dodgerblue',
  },
  title: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
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
  name: {
    fontWeight: 'normal',
    color: 'white',
    fontStyle: 'italic',
  },
});

const mapStateToProps = ({patients}) => ({
  selectedPatientFromTopMenu: patients.selectedPatientFromTopMenu,
});

export default connect(mapStateToProps, {})(Header);
