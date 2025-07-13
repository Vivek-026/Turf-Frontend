import { fetchUserProfile } from '../store/slices/authSlice';

export const authMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const { auth } = state;

  // If token exists but user is not loaded, fetch profile
  if (auth.token && !auth.user) {
    store.dispatch(fetchUserProfile());
  }

  return next(action);
};
