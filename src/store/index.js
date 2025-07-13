import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import turfReducer from './slices/turfSlice';
import bookingReducer from './slices/bookingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    turfs: turfReducer,
    bookings: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Type definitions for RootState and AppDispatch
// These types are used in other files
// In a TypeScript project, you would export these types
// For JavaScript, we'll use them directly in the code
