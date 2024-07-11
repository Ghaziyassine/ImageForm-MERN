import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './imageSlice.js';



const store = configureStore({
  reducer: {
    image: imageReducer,
  },
});

export default store;
