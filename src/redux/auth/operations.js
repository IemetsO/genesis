import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';


axios.defaults.baseURL = "https://api.wisey.app/api/v1/"

const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

export const logIn = createAsyncThunk(
    'auth/login',
    async ( thunkAPI) => {
      try {
        const res = await axios.get(axios.defaults.baseURL + "auth/anonymous?platform=subscriptions");
        setAuthHeader(res.data.token);
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


 
  