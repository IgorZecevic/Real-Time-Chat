import apiClient from './apiClient';

export const createRoom = async (roomData) => {
  const response = await apiClient.post('/rooms', roomData);
  return response.data;
};

export const getRooms = async () => {
  const response = await apiClient.get('/rooms');
  return response.data;
};
