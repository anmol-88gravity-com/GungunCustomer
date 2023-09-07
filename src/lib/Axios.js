import Config from '../config';
import axios from 'axios';
import { ApiEndpoints } from '../store/ApiEndPoints';
import { load } from '../utils/storage';

export const Axios = axios.create({
  baseURL: Config.API_URL,
});

const authRoutes = [
  ApiEndpoints.auth.login,
  ApiEndpoints.auth.register,
  ApiEndpoints.auth.registerOtp,
  ApiEndpoints.auth.uniqueCheck,
  ApiEndpoints.auth.otpGenerate,
  ApiEndpoints.auth.otpVerify,
  ApiEndpoints.auth.updatePassword,

];

Axios.interceptors.request.use(
  async function (config) {
    config.headers = config.headers ?? {};
    if (
      !authRoutes.find(
        route => route === config.url || config.headers?.withToken,
      )
    ) {
      const { accessToken } = await load(Config.USER_SESSION);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
