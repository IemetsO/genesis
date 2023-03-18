import { createSlice } from '@reduxjs/toolkit';
import { fetchCourses } from './operations';
import { fetchCourse } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [],
    item:[],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchCourses.pending]: handlePending,
    [fetchCourse.pending]: handlePending,
    [fetchCourses.rejected]: handleRejected,
    [fetchCourse.rejected]: handleRejected,
    [fetchCourses.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchCourse.fulfilled](state, action) {
        state.isLoading = false;
        state.error = null;
        state.item = action.payload;
      },}
});

export const coursesReducer = courseSlice.reducer;