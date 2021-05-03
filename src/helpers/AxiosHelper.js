import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';
import { USER_DETAIL, SIGNIN_SCREEN } from './ConstantHelper';
import { navigate } from './NavigationHelper';

const instance = axios.create({ baseURL: API_URL });

instance.interceptors.request.use(
  async config => {
    const userDetail = await AsyncStorage.getItem(USER_DETAIL);
    if (userDetail) {
      config.headers.Authorization = `Bearer ${
        JSON.parse(userDetail).accessToken
      }`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  response => response,
  async err => {
    if (err.message?.status === 401) {
      await AsyncStorage.removeItem(USER_DETAIL);
      navigate(SIGNIN_SCREEN);
    } else {
      return Promise.reject(err);
    }
  }
);

export default instance;
