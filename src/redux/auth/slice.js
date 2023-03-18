import { createSlice } from '@reduxjs/toolkit';
import {  logIn } from './operations';

const initialState = {
  token: null,
  isLoggedIn: false,
 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    
    [logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
  },
});

export const authReducer = authSlice.reducer;