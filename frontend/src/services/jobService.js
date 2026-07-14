import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const jobService = {
  // Get all jobs
  getJobs: async (params = {}) => {
    const response = await axios.get(`${API_URL}/jobs`, { params });
    return response.data;
  },

  // Get single job
  getJob: async (id) => {
    const response = await axios.get(`${API_URL}/jobs/${id}`);
    return response.data;
  },

  // Create job
  createJob: async (jobData) => {
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    return response.data;
  },

  // Update job
  updateJob: async (id, jobData) => {
    const response = await axios.put(`${API_URL}/jobs/${id}`, jobData);
    return response.data;
  },

  // Delete job
  deleteJob: async (id) => {
    const response = await axios.delete(`${API_URL}/jobs/${id}`);
    return response.data;
  },

  // Apply for job
  applyForJob: async (id, data) => {
    const response = await axios.post(`${API_URL}/jobs/${id}/apply`, data);
    return response.data;
  }
};
