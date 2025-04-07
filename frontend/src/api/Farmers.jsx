import axios from 'axios';

const API_URL = 'http://52.66.183.128:5000/api/farmer';

export const createFarmer = async (data) => {
  const response = await axios.post(`${API_URL}/add`, data);
  return response.data;
};

export const getFarmers = async () => {
  const response = await axios.get(`${API_URL}/get`);
  return response.data;
};

export const updateFarmer = async (id, data) => {
  const response = await axios.put(`${API_URL}/update/${id}`, data);
  return response.data;
};

export const deleteFarmer = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};
