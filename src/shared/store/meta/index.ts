import { createSlice } from '@reduxjs/toolkit';
import { getMetaInfoAsync, findCategories } from './actions';
import { getCollegesAsync } from './actions/getCollegesAsync';
import { MetaState } from './dtos/MetaState';

const initialState: MetaState = {
  searchCategories: [],
  categories: [],
  countries: [],
  languages: [],
  timezones: [],
  degrees: [],
  majors: [],
  professionalTitles: [],
  skills: [],
  states: [],
  colleges: [],
};

const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMetaInfoAsync.fulfilled, (state, action) => {
      state.countries = action.payload.countries;
      state.languages = action.payload.languages;
      state.degrees = action.payload.degrees;
      state.states = action.payload.state;
      state.timezones = action.payload.time_zones.map((t) => {
        if (t.name.includes('_')) {
          return { ...t, name: t.name.replaceAll('_', ' ') };
        }
        return t;
      });
      state.majors = action.payload.majors;
      state.professionalTitles = action.payload.professional_titles;
      state.skills = action.payload.skills;
    });
    builder.addCase(findCategories.fulfilled, (state, action) => {
      state.searchCategories = action.payload;
    });
    builder.addCase(getCollegesAsync.fulfilled, (state, action) => {
      state.colleges = action.payload;
    });
  },
});

export default metaSlice.reducer;
