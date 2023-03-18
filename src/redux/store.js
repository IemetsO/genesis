import { configureStore } from '@reduxjs/toolkit';
import { coursesReducer } from './courses/slice';
import { authReducer } from './auth/slice';


const authPersistConfig = {
    key: 'auth',
    whitelist: ['token'],
  };
  
export const store = configureStore({
    reducer: {
      auth: authReducer, authPersistConfig,
      courses: coursesReducer,
    },
  
    devTools: process.env.NODE_ENV === 'development',
  });






