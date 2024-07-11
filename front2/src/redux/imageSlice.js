import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadImage = createAsyncThunk('image/upload', async (formData) => {
  const response = await axios.post('http://localhost:3000/upload', formData);
  return response.data;
});

export const fetchImages = createAsyncThunk('image/fetch', async () => {
  const response = await axios.get('http://localhost:3000/getImage');
  return response.data;
});

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images.push(action.payload);
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default imageSlice.reducer;
