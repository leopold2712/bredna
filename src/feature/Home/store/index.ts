import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabSheets } from '../constants/TabSheet';

const onBoardingStepsInitialValues = {
  completeProfile: {
    title: null,
    about: null,
    state_id: null,
    fileSource: null,
    fileName: null,
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    isFirstVisit: false,
    abandoneOnboarding: false,
    abandonedPage: TabSheets.completeProfile,
    activePage: TabSheets.completeProfile,
    backActionIndicator: false,
    skipActionIndicator: false,
    saveActionIndicator: false,
    onboardingSteps: onBoardingStepsInitialValues,
  },
  reducers: {
    setDefaultOnboarding: (state) => {
      state.isFirstVisit = false;
      state.activePage = TabSheets.completeProfile;
    },
    setIsFirstVisit: (state, action: PayloadAction<boolean>) => {
      state.isFirstVisit = action.payload;
    },
    setAbandoneOnboarding: (state, action: PayloadAction<boolean>) => {
      state.abandoneOnboarding = action.payload;
    },
    setAbandonedPage: (state, action: PayloadAction<TabSheets>) => {
      state.abandoneOnboarding = true;
      state.abandonedPage = action.payload;
    },
    setActivePage: (state, action: PayloadAction<TabSheets>) => {
      state.activePage = action.payload;
    },
    toggleBackIndicator: (state, action: PayloadAction<boolean>) => {
      state.backActionIndicator = action.payload;
    },
    toggleSkipIndicator: (state, action: PayloadAction<boolean>) => {
      state.skipActionIndicator = action.payload;
    },
    toggleSaveIndicator: (state, action: PayloadAction<boolean>) => {
      state.saveActionIndicator = action.payload;
    },
    clearOnboardingStepsValues: (state) => {
      state.onboardingSteps = onBoardingStepsInitialValues;
    },
    setCompleteProfileStepValues: (state, action) => {
      const { payload } = action;
      state.onboardingSteps.completeProfile = {
        ...state.onboardingSteps.completeProfile,
        about: payload.about,
        fileSource: payload.fileSource,
        fileName: payload.fileName,
        title: payload.title,
        state_id: payload.state_id,
      };
    },
  },
});

export const {
  setDefaultOnboarding,
  setIsFirstVisit,
  setAbandoneOnboarding,
  setAbandonedPage,
  setActivePage,
  toggleBackIndicator,
  toggleSkipIndicator,
  toggleSaveIndicator,
  setCompleteProfileStepValues,
  clearOnboardingStepsValues,
} = homeSlice.actions;

export default homeSlice.reducer;
