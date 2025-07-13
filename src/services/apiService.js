import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add a request interceptor to handle authentication
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors and token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle different error codes
      switch (error.response.status) {
        case 401: // Unauthorized
          // Token expired or invalid
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403: // Forbidden
          throw new Error('Access denied');
        case 404: // Not found
          throw new Error('Resource not found');
        default:
          throw error;
      }
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle different error codes
      switch (error.response.status) {
        case 401:
          // Token expired or invalid
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden access
          throw new Error('Access denied');
        case 404:
          // Not found
          throw new Error('Resource not found');
        default:
          throw error;
      }
    }
    return Promise.reject(error);
  }
);

// Turf API
export const getTurfs = () => axios.get('/turfs');
export const getTurfById = (id) => axios.get(`/turfs/${id}`);
export const createTurf = (turfData) => axios.post('/turfs', turfData);
export const updateTurf = (id, turfData) => axios.put(`/turfs/${id}`, turfData);
export const deleteTurf = (id) => axios.delete(`/turfs/${id}`);
export const updateSlotStatus = (id, slotData) => axios.patch(`/turfs/${id}/slots`, slotData);

// Booking API
export const bookSlot = (turfId, bookingData) => axios.post(`/bookings/${turfId}`, bookingData);
export const getUserBookings = () => axios.get('/bookings/my');
export const getAllBookings = (filters) => axios.get('/bookings', { params: filters });
export const cancelBooking = (id) => axios.patch(`/bookings/${id}/cancel`);
