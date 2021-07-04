import React, {useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Image} from 'react-native';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import Form from '../../components/Form';
import ErrorMessage from '../../components/ErrorMessage';
import FormField from '../../components/FormField';
import SubmitButton from '../../components/SubmitButton';
import ActivityIndicator from '../../components/ActivityIndicator';
import useAuth from '../../auth/useAuth';
import {login} from '../../redux/reducers/login/login-reducer';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  password: Yup.string().required().label('Password'),
});

const LoginScreen = props => {
  const {errorMessage, loading} = props;
  const auth = useAuth();

  const handleSubmit = async ({username, password}) => {
    props.login(username, password, auth);
  };

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={loading} />
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      <Form
        initialValues={{username: '', password: ''}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <ErrorMessage error={errorMessage} visible={errorMessage} />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          name="username"
          placeholder="Username"
          textContentType="username"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 200,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

const mapStateToProps = ({login}) => ({
  errorMessage: login.errorMessage,
  loading: login.loading,
});

export default connect(mapStateToProps, {login})(LoginScreen);
