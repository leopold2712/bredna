import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CollegeDTO } from '../dtos/college.dto';
import { ThunkConfig } from '../../../../main/store';
import HeyToast from '../../../components/HeyToast';

export const getCollegesAsync = createAsyncThunk<CollegeDTO[], void, ThunkConfig>(
  'meta/getColleges',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get<{ data: CollegeDTO[] }>('/utils/colleges');

      return data;
    } catch (err) {
      HeyToast.show({ text: 'Error while getting a colleges', isError: true });
      return rejectWithValue(err);
    }
  },
);
