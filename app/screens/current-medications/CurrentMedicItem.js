import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ActivityIndicator, Avatar, Card, Divider} from 'react-native-paper';

import sideEffectsApi from '../../api/sideEffects';
import colors from '../../config/colors';

const CurrentMedicItem = ({item}) => {
  const [sideEffects, setSideEffects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMedicationSideEffects = async id => {
    setLoading(true);
    const result = await sideEffectsApi.getMedicationSideEffect(id);
    if (result.ok) {
      setLoading(false);
      setSideEffects(result.data);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicationSideEffects(item?.id);
  }, [item?.id]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={item.prescriptionCode}
          subtitle={item.usageDescription}
          left={props => (
            <Avatar.Image
              {...props}
              source={require('../../assets/atorvastatin.jpg')}
            />
          )}
        />
        <Divider />
        <Card.Content>
          <Text style={styles.titles}>Important Information</Text>
          <Text style={styles.contents}>{item?.importantInfo}</Text>
        </Card.Content>
        <Divider />
        <Card.Content>
          <Text style={styles.titles}>Refill Time</Text>
          <Text style={styles.contents}>{item?.refillTime}</Text>
        </Card.Content>
        <Divider />
        <Card.Content>
          <Text style={styles.titles}>Side Effects</Text>
          {loading && sideEffects.length > 0 ? (
            <ActivityIndicator
              size="small"
              color={colors.darkBlue}
              animating={loading}
            />
          ) : (
            <Text style={styles.contents}>{sideEffects?.sideEffect}</Text>
          )}
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
    padding: 5,
    backgroundColor: colors.mainGrey,
    borderRadius: 5,
  },
  titles: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 10,
  },
  contents: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'grey',
    marginBottom: 10,
  },
});

export default CurrentMedicItem;
