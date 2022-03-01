import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ProductDTO } from '../../../../shared/dtos/product.dto';
import type { ThunkConfig } from '../../../../main/store';

export const getProducts = createAsyncThunk<ProductDTO[], void, ThunkConfig>(
  'products/get-all',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get<{ data: ProductDTO[] }>('/products');
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
