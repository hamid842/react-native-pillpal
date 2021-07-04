import {
  GET_PATIENTS,
  SELECT_PATIENT,
  SELECT_PATIENT_FROM_TOP_MENU,
} from '../../action-types/action-types';
import patients from '../../../api/patients';

// State
const initialState = {
  patients: [],
  selectedPatient: {},
  selectedPatientFromTopMenu: {},
};

const getAccountPatients = async id => {
  const {data} = await patients.getAccountPatients(id);
  return data;
};

// Actions
export const getAllPatients = id => async dispatch => {
  dispatch({
    type: GET_PATIENTS,
    payload: await getAccountPatients(id),
  });
};

export const selectPatient = id => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: SELECT_PATIENT,
    payload: state.patients?.patients?.find(item => item.id === id),
  });
};

export const selectPatientFromTopMenu = id => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: SELECT_PATIENT_FROM_TOP_MENU,
    payload: state.patients?.patients?.find(item => item.id === id),
  });
};

// Reducer
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENTS: {
      return {
        ...state,
        patients: action.payload,
      };
    }
    case SELECT_PATIENT: {
      return {
        ...state,
        selectedPatient: action.payload,
      };
    }
    case SELECT_PATIENT_FROM_TOP_MENU: {
      return {
        ...state,
        selectedPatientFromTopMenu: action.payload,
      };
    }
    default:
      return state;
  }
};
