import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';
import { authApi } from './ApiController/authApi';
import { thesisApi } from './ApiController/thesisApi';

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      thesisApi.middleware,
    ),
});

const initializeApp = async () => {
  try {
    if (authApi.endpoints.checkAuth) {
      await appStore.dispatch(
        authApi.endpoints.checkAuth.initiate({}, { forceRefetch: true })
      );
    } else {
      console.error('checkAuth endpoint not found in authApi');
    }
  } catch (error) {
    console.error('Error loading user:', error);
  }
};

initializeApp();
