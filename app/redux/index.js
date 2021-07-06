import {combineReducers} from 'redux';

import login from './reducers/login/login-reducer';
import patients from './reducers/patients/patients-reducer';

const rootReducer = combineReducers({
  login,
  patients,
});

export default rootReducer;
