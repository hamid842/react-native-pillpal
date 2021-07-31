import React, {useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import ErrorMessage from '../../components/ErrorMessage';
import Form from '../../components/Form';
import FormField from '../../components/FormField';
import SubmitButton from '../../components/SubmitButton';
import usersApi from '../../api/users';
import useApi from '../../hooks/useApi';
import useAuth from '../../auth/useAuth';
import ActivityIndicator from '../../components/ActivityIndicator';
import {login} from '../../redux/reducers/login/login-reducer';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First Name'),
  lastName: Yup.string().required().label('Last Name'),
  email: Yup.string().required().email().label('Email'),
  login: Yup.string().required().label('Username'),
  password: Yup.string().required().min(4).label('Password'),
});

function RegisterScreen(props) {
  const registerApi = useApi(usersApi.register);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async userInfo => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) {
        setError(result.data.title);
      } else {
        setError('An unexpected error occurred.');
      }
      return;
    }

    props.login(userInfo.login, userInfo.password, auth);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || props.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            langKey: 'en',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="firstName"
            placeholder="First Name"
          />
          <FormField
            autoCorrect={false}
            icon="account"
            name="lastName"
            placeholder="Last Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account-cog"
            keyboardT
            name="login"
            placeholder="Username"
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
          <SubmitButton title="Register" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const mapStateToProps = ({login}) => ({
  loading: login.loading,
});

export default connect(mapStateToProps, {login})(RegisterScreen);
