import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';

import users from '../../api/users';
import colors from '../../config/colors';
import GeneralInfoRow from './GeneralInfoRow';

const GeneralInfo = ({account}) => {
  const [userInfos, setUserInfos] = useState();

  const getLoggedInUserInfos = async id => {
    const result = await users.getUserInfos(id);
    if (result.ok) setUserInfos(result.data);
    if (!result.ok) return;
  };

  useEffect(() => {
    getLoggedInUserInfos(account?.id);
  }, [account?.id]);
  return (
    <Card style={styles.card}>
      <GeneralInfoRow
        icon="account"
        title="First Name:"
        value={account?.firstName}
      />
      <GeneralInfoRow
        icon="account"
        title="Last Name:"
        value={account?.lastName}
      />
      <GeneralInfoRow icon="email" title="Email:" value={account?.email} />
      <GeneralInfoRow
        icon="account-search"
        title="Username:"
        value={account?.login}
      />
      <GeneralInfoRow
        icon="account-cog"
        title="User Code:"
        value={userInfos?.userCode}
      />
      <GeneralInfoRow
        icon="phone-hangup"
        title="Phone No.:"
        value={userInfos?.phoneNumber1}
      />
      <GeneralInfoRow
        icon="cellphone"
        title="Mobile No.:"
        value={userInfos?.phoneNumber2}
      />
      <GeneralInfoRow
        icon="home-city"
        title="Address:"
        value={userInfos?.address}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.mainGrey,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titlesContainer: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  titles: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({login}) => ({
  account: login.account,
});

export default connect(mapStateToProps, {})(GeneralInfo);
