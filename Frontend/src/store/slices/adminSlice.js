import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

//db'den veri çekme
export const fetchProducts = createAsyncThunk(
  'admin/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${backendUrl}/admin/products`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  products: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default adminSlice.reducer;

