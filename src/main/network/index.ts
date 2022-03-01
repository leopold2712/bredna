import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import { AnalyticsService } from '../../shared/services/analytics';
import { JwtToken } from './models/JwtToken';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const onRequest = (config: AxiosRequestConfig) => {
  config.headers['x-auth-token'] = localStorage.getItem('token');

  return config;
};

const onResponse = (response: AxiosResponse) => {
  const token = response.headers['x-auth-token'];

  if (token) {
    const decoded = jwt_decode<JwtToken>(token);
    AnalyticsService.setIsTestAccount(decoded.isTestAccount);

    localStorage.setItem('token', token);
  }

  return response;
};

axios.interceptors.request.use(onRequest);

axios.interceptors.response.use(onResponse);

export const unauthorizedInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL_V2 });

export const axiosV2 = axios.create({ baseURL: process.env.REACT_APP_API_URL_V2 });
