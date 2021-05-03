import createDataContext from './createDataContext';
import api from '../helpers/AxiosHelper';
import { navigate, goBack } from '../helpers/NavigationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LANDING_SCREEN,
  NEW_PASSWORD_SCREEN,
  SIGNIN_SCREEN,
  USER_DETAIL,
} from '../helpers/ConstantHelper';
import { successToast } from '../helpers/ToastHelper';

const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNIN_ERROR = 'SIGNIN_ERROR';

const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

const NEW_PASSWORD_REQUEST = 'NEW_PASSWORD_REQUEST';
const NEW_PASSWORD_SUCCESS = 'NEW_PASSWORD_SUCCESS';
const NEW_PASSWORD_ERROR = 'NEW_PASSWORD_ERROR';

const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR';

const SIGNOUT_REQUEST = 'SIGNOUT_REQUEST';

const CLEAR_ERROR = 'CLEAR_ERROR';

const authReducer = (state, action) => {
  switch (action.type) {
    // Sign in
    case SIGNIN_REQUEST:
      return { ...state, fetching: true, userDetail: null, errorMessage: '' };
    case SIGNIN_SUCCESS:
      return { fetching: false, userDetail: action.payload, errorMessage: '' };
    case SIGNIN_ERROR:
      return {
        ...state,
        fetching: false,
        userDetail: null,
        errorMessage: action.payload,
      };

    // Sign out
    case SIGNOUT_REQUEST:
      return { userDetail: null, errorMessage: '' };

    // Forgot password
    case FORGOT_PASSWORD_REQUEST:
      return { ...state, fetching: true, errorMessage: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, fetching: false, errorMessage: '' };
    case FORGOT_PASSWORD_ERROR:
      return { ...state, fetching: false, errorMessage: action.payload };

    // New password
    case NEW_PASSWORD_REQUEST:
      return { ...state, fetching: true, errorMessage: '' };
    case NEW_PASSWORD_SUCCESS:
      return { ...state, fetching: false, errorMessage: '' };
    case NEW_PASSWORD_ERROR:
      return { ...state, fetching: false, errorMessage: action.payload };

    // Change password
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, fetching: true, errorMessage: '' };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, fetching: false, errorMessage: '' };
    case CHANGE_PASSWORD_ERROR:
      return { ...state, fetching: false, errorMessage: action.payload };

    // Clear error
    case CLEAR_ERROR:
      return { ...state, fetching: false, token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const userDetail = await AsyncStorage.getItem(USER_DETAIL);
  if (userDetail) {
    dispatch({ type: SIGNIN_SUCCESS, payload: userDetail.accessToken });
    navigate(LANDING_SCREEN);
  } else {
    navigate(SIGNIN_SCREEN);
  }
};

const clearError = dispatch => () => {
  dispatch({ type: CLEAR_ERROR });
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem(USER_DETAIL);
  dispatch({ type: SIGNOUT_REQUEST });
  navigate(SIGNIN_SCREEN);
};

const signin = dispatch => async ({ name, password }) => {
  try {
    dispatch({ type: SIGNIN_REQUEST });
    const response = await api.post('/users/login', {
      name,
      password,
      isShort: false,
    });
    if (response.data.role === 'Patient') {
      await AsyncStorage.setItem(USER_DETAIL, JSON.stringify(response.data));
      dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
      navigate(LANDING_SCREEN, { screen: 'Reminder' });
    } else {
      dispatch({
        type: SIGNIN_ERROR,
        payload: 'Your are not authorized to use this app.',
      });
    }
  } catch (error) {
    dispatch({
      type: SIGNIN_ERROR,
      payload: 'Signin Failed. Try with valid credentials.',
    });
  }
};

const forgotPassword = dispatch => async ({ name }) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    await api.put('/users/recover-password', { name, url: 'MOBILE' });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS });
    navigate(NEW_PASSWORD_SCREEN);
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_SUCCESS });
    navigate(NEW_PASSWORD_SCREEN);
  }
};

const newPassword = dispatch => async ({ token, password }) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });
    await api.put('/users/reset-password', {
      verificationCode: token,
      password,
    });
    dispatch({ type: NEW_PASSWORD_SUCCESS });
    successToast('New password set successfully.');
    navigate(SIGNIN_SCREEN);
  } catch (error) {
    dispatch({ type: NEW_PASSWORD_ERROR, payload: error.message });
  }
};

const changePassword = dispatch => async ({ id, oldPassword, password }) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    await api.put(`/external/change-password/${id}`, {
      oldPassword,
      password,
    });
    dispatch({ type: CHANGE_PASSWORD_SUCCESS });
    successToast('Password changed successfully.');
    goBack();
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_ERROR,
      payload: 'Error changing password. Try after sometime.',
    });
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    signin,
    signout,
    clearError,
    tryLocalSignin,
    forgotPassword,
    newPassword,
    changePassword,
  },
  { fetching: false, userDetail: null, isSignedIn: false, errorMessage: '' }
);
