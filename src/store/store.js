import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; 
import  bookingsReducer  from './slices/bookingSlice';
import  turfsReducer  from './slices/turfSlice';
import { authMiddleware } from '../middleware/authMiddleware';

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingsReducer,
    turfs: turfsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export default store;
