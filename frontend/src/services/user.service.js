import apiClient from './apiClient';

export const getUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};
