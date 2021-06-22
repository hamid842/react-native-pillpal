import React, {useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import Form from '../../components/Form';
import ErrorMessage from '../../components/ErrorMessage';
import FormField from '../../components/FormField';
import SubmitButton from '../../components/SubmitButton';
import authApi from '../../api/auth';
import useAuth from '../../auth/useAuth';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  password: Yup.string().required().label('Password'),
});

const LoginScreen = () => {
  const auth = useAuth();

  const [loginFailed, setLoginFailed] = useState(false);
  
  const handleSubmit = async ({username, password}) => {
    const result = await authApi.login(username, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data.id_token);
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      <Form
        initialValues={{username: '', password: ''}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        />
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

export default LoginScreen;
