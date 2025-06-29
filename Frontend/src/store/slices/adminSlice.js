import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

//db'den veri çekme
export const fetchProducts = createAsyncThunk(
  'admin/fetchProducts',
  async (_, thunkAPI) => {
    try {
      console.log('Fetching from URL:', `${backendUrl}/admin/products`);
      const response = await axios.get(`${backendUrl}/admin/products`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error response:', error.response);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Ürünler yüklenirken bir hata oluştu'
      );
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
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.products = [];
      });
  }
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;

