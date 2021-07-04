import {combineReducers} from 'redux';

import login from './reducers/login/login-reducer';
import patients from './reducers/patients/patients-resucer';

const rootReducer = combineReducers({
  login,
  patients,
});

export default rootReducer;
