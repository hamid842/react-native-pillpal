import {
  SET_MEDICATION_IMAGE,
  SET_PRESCRIPTION_IMAGE,
  SET_PROFILE_IMAGE,
} from '../../action-types/action-types';
// import images from '../../../api/images';

const initialState = {
  profileImage: '',
  prescriptionImage: '',
  medicationImage: '',
};

export const setImage = (image, imageSourceType) => dispatch => {
  if (imageSourceType === 'profile') {
    dispatch({
      type: SET_PROFILE_IMAGE,
      payload: image,
    });
  }
  if (imageSourceType === 'prescription') {
    dispatch({
      type: SET_PRESCRIPTION_IMAGE,
      payload: image,
    });
  }
  if (imageSourceType === 'medication') {
    dispatch({
      type: SET_MEDICATION_IMAGE,
      payload: image,
    });
  }
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_IMAGE: {
      return {
        ...state,
        profileImage: action.payload,
      };
    }
    case SET_PRESCRIPTION_IMAGE: {
      return {
        ...state,
        prescriptionImage: action.payload,
      };
    }
    case SET_MEDICATION_IMAGE: {
      return {
        ...state,
        medicationImage: action.payload,
      };
    }
    default:
      return state;
  }
};
