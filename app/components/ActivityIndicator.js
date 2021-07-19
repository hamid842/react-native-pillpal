import React, {memo} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, Dimensions} from 'react-native';

const ActivityIndicator = ({visible = false}) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animations/loader.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    backgroundColor: 'white',
    height: '100%',
    opacity: 0.8,
    zIndex: 1,
  },
});

export default memo(ActivityIndicator);
