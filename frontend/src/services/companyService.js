import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const companyService = {
  // Get all companies
  getCompanies: async () => {
    const response = await axios.get(`${API_URL}/companies`);
    return response.data;
  },

  // Get single company
  getCompany: async (id) => {
    const response = await axios.get(`${API_URL}/companies/${id}`);
    return response.data;
  },

  // Create company
  createCompany: async (data) => {
    const response = await axios.post(`${API_URL}/companies`, data);
    return response.data;
  },

  // Update company
  updateCompany: async (id, data) => {
    const response = await axios.put(`${API_URL}/companies/${id}`, data);
    return response.data;
  },

  // Delete company
  deleteCompany: async (id) => {
    const response = await axios.delete(`${API_URL}/companies/${id}`);
    return response.data;
  }
};
