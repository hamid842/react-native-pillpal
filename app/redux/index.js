import {combineReducers} from 'redux';

import login from './reducers/login/login-reducer';
import patients from './reducers/patients/patients-reducer';
import userInfos from './reducers/user-infos/userInfo-reducer';

const rootReducer = combineReducers({
  login,
  patients,
  userInfos,
});

export default rootReducer;
