import apiClient from './apiClient';

export const login = async (userData) => {
  const response = await apiClient.post('/auth/login', userData);
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.get('/auth/logout');
  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

export const checkLoginStatus = async () => {
  const response = await apiClient.get('/auth/login-status');
  return response.data;
};
