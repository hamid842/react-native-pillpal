import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ActivityIndicator, Avatar, Card, Divider} from 'react-native-paper';

import medicineApi from '../../api/sideEffects';
import colors from '../../config/colors';

const CurrentMedicItem = ({item}) => {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMedicationInfos = async id => {
        setLoading(true);
        const result = await medicineApi.getMedicineInfo(id);
        console.log(result.data)
        if (result.ok) {
            setLoading(false);
            setMedications(result.data);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicationInfos(item?.medicine?.id).then(() => {
        });
    }, [item?.id]);

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title
                    title={medications.brandName}
                    subtitle={item.usageDescription}
                    left={props => (
                        <Avatar.Image
                            {...props}
                            source={require('../../assets/atorvastatin.jpg')}
                        />
                    )}
                />
                <Divider/>
                <Card.Content>
                    <Text style={styles.titles}>Important Information</Text>
                    <Text style={styles.contents}>{item?.importantInfo}</Text>
                </Card.Content>
                <Divider/>
                <Card.Content>
                    <Text style={styles.titles}>Refill Time</Text>
                    <Text style={styles.contents}>{item?.refillTime}</Text>
                </Card.Content>
                <Divider/>
                <Card.Content>
                    <Text style={styles.titles}>Side Effects</Text>
                    {loading && medications.length > 0 ? (
                        <ActivityIndicator
                            size="small"
                            color={colors.darkBlue}
                            animating={loading}
                        />
                    ) : (
                        <>
                            {medications?.sideEffects?.map((sideEffect,index) => {
                                return (
                                    <Text key={index} style={styles.contents}>{sideEffect.sideEffect}</Text>
                                )
                            })}
                        </>

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
