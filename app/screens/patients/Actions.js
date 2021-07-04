import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';

const Actions = props => {
  const [showActions, setShowActions] = useState(false);
  return (
    <View {...props}>
      {!showActions ? (
        <Icon
          name="account-edit-outline"
          size={30}
          onPress={() => setShowActions(true)}
        />
      ) : (
        <View style={styles.container}>
          <Icon name="file-edit-outline" size={25} color={colors.mainBlue} />
          <Icon
            name="delete-outline"
            size={30}
            color={colors.danger}
            style={{marginLeft: 15}}
          />
          <Icon
            name="close"
            size={30}
            style={{marginLeft: 15}}
            onPress={() => setShowActions(false)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Actions;
