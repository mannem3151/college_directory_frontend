// src/api.js

import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update to your API base URL

export const registerUser = async (userData) => {
  try {
    return await axios.post(`${API_URL}/auth/register`, userData);
  } catch (error) {
    console.error("Error during registration:", error);
    throw error; // Re-throw the error for the calling function to handle it
  }
};

export const loginUser = async (credentials) => {
  try {
    return await axios.post(`${API_URL}/auth/login`, credentials);
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Re-throw the error
  }
};
// src/api.js

export const fetchDashboardData = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(`${API_URL}/admin/dashboard`, {
    headers: {
      Authorization: token,
    },
  });
};

export const fetchStudents = async (token) => {
  try {
    return await axios.get(`${API_URL}/admin/students`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error; // Re-throw the error for further handling
  }
};

// Optional: Setup Axios Interceptor for token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Additional functions for updating and deleting students can go here
