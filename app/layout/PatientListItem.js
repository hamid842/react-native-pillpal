import React from 'react';
import {List, Avatar} from 'react-native-paper';

const PatientListItem = ({patient, onPress}) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Item
      title={`${patient?.firstName} ${patient.lastName}`}
      description={`Age: ${patient?.age}`}
      left={props => (
        <Avatar.Image
          {...props}
          size={45}
          source={require('../assets/hamid.png')}
        />
      )}
      onPress={onPress}
    />
  );
};

export default PatientListItem;
