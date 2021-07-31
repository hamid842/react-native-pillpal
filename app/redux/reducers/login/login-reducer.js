import {
  LOGIN_FAILED,
  LOGOUT,
  TOGGLE_LOAD,
  GET_ACCOUNT_INFO,
} from '../../action-types/action-types';
import authApi from '../../../api/auth';
import accountInfo from '../../../api/accountInfo';

// Initial state
const initialState = {
  isAuthenticated: false,
  errorMessage: '',
  account: {},
  userInfos: {},
  status: false,
  loading: false,
};

const getLoggedInAccountInfo = async () => {
  const {data} = await accountInfo.getAccountInfo();
  return data;
};

// Actions
export const login = (username, password, auth) => async dispatch => {
  dispatch({type: TOGGLE_LOAD});
  const result = await authApi.login(username, password);
  if (result.ok) {
    auth.logIn(result.data.id_token);
    dispatch({type: TOGGLE_LOAD});
    dispatch({
      type: GET_ACCOUNT_INFO,
      payload: await getLoggedInAccountInfo(),
    });
  } else {
    dispatch({
      type: LOGIN_FAILED,
      payload: result.data.detail,
    });
    dispatch({type: TOGGLE_LOAD});
  }
};
export const logout = auth => dispatch => {
  dispatch({
    type: LOGOUT,
    payload: auth.logIn(null),
  });
};

// Reducer
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOAD: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case GET_ACCOUNT_INFO: {
      return {
        ...state,
        account: action.payload,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case LOGOUT: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};
