import { push } from 'react-router-redux';

export const INITIALIZE_PROFILE = 'INITIALIZE_PROFILE';

export const initializeProfile = (profile) => {
  return (dispatch, getState) => {
    dispatch({
      type: INITIALIZE_PROFILE,
      profile
    });
    dispatch(push('/'));
  };
};
