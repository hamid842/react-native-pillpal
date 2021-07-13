import {GET_USER_INFOS} from '../../action-types/action-types';
import users from '../../../api/users';

// State
const initialState = {
  userInfos: {},
};

// Actions
export const getUserInfos = id => async dispatch => {
  const result = await users.getUserInfos(id);
  dispatch({
    type: GET_USER_INFOS,
    payload: result.data,
  });
};

// Reducer
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFOS: {
      return {
        ...state,
        userInfos: action.payload,
      };
    }

    default:
      return state;
  }
};
