import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// GET @ /tasks
export const fetchCourses = createAsyncThunk(
  'courses/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/core/preview-courses');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCourse = createAsyncThunk(
    'courses/fetchCourse',
    async (courseId, thunkAPI) => {
      try {
        const res = await axios.get(`/core/preview-courses${courseId}`);
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );