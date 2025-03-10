import axios from 'axios';
import { API_BASE_URL } from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});



const api2 = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});


export const authAPI = {

  registerUser: async (credentials) => {
      const response = await api.post('/auth/register', credentials);
      return response;
    },


  login: async (credentials) => {
    try {
      const response = await api.post('/token', credentials);
      const { access_token  } = response.data;
      
      if (access_token ) {
        localStorage.setItem('token', access_token);
        return { 
          success: true, 
          access_token  
        };
      }
      throw new Error('No token received');
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  },

  verifyToken: async (token) => {
    try {
      const response = await api.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { valid: true, user: response.data };
    } catch (error) {
      return { valid: false };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    return { success: true };
  }
};