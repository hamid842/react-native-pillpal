import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AnimatedLoader from 'react-native-animated-loader';

import navigationTheme from './app/navigation/navigationTheme';
import OfflineNotice from './app/components/OfflineNotice';
// import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import {navigationRef} from './app/navigation/rootNavigation';
import authStorage from './app/auth/storage';
import AuthContext from './app/auth/context';

const App = () => {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const loggedInUser = await authStorage.getUser();
    if (loggedInUser) {
      return setUser(loggedInUser);
    } else {
      return setIsReady(true);
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);

  if (!isReady) {
    return (
      <AnimatedLoader
        visible={isReady}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('./app/assets/animation/loader.json')}
        animationStyle={styles.lottie}
        speed={1}
      />
    );
  }
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <OfflineNotice />
      <StatusBar style="auto" />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AppNavigator />
        {/* {user ? <AppNavigator /> : <AuthNavigator />} */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});

export default App;
