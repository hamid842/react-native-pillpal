import {combineReducers} from 'redux';

import login from './reducers/login/login-reducer';
import patients from './reducers/patients/patients-reducer';
import userInfos from './reducers/user-infos/userInfo-reducer';
import images from './reducers/images/images-reducer';

const rootReducer = combineReducers({
  login,
  patients,
  userInfos,
  images,
});

export default rootReducer;
