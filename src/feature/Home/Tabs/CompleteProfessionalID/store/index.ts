import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CertificateModel, EducationModel } from '../models';

export type OnboardingState = {
  isLoaded: boolean;
  educations: EducationModel[];
  certificates: CertificateModel[];
};

const initialState: OnboardingState = {
  isLoaded: false,
  educations: [],
  certificates: [],
};

const educationSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    clearEducations: (state) => {
      state.educations = [];
    },
    addEducation: (state, action: PayloadAction<EducationModel>) => {
      if (!action.payload.id) {
        action.payload.id = `f${(+new Date()).toString(16)}`;
      }
      state.educations.push(action.payload);
    },
    editEducation: (state, action: PayloadAction<EducationModel>) => {
      const index = state.educations.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.educations.splice(index, 1, action.payload);
      }
    },
    removeEducation: (state, action: PayloadAction<EducationModel>) => {
      const index = state.educations.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.educations[index].deleted = true;
      }
    },
    clearCertificates: (state) => {
      state.certificates = [];
    },
    addCertificate: (state, action: PayloadAction<CertificateModel>) => {
      const certificatesClone = [...state.certificates];
      if (!action.payload.id) {
        action.payload.id = `f${(+new Date()).toString(16)}`;
      }
      certificatesClone.push(action.payload);
      state.certificates = certificatesClone;
    },
    editCertificate: (state, action: PayloadAction<CertificateModel>) => {
      const index = state.certificates.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.certificates.splice(index, 1, action.payload);
      }
    },
    removeCertificate: (state, action: PayloadAction<CertificateModel>) => {
      const index = state.certificates.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.certificates[index].deleted = true;
      }
    },
  },
});

export const {
  clearEducations,
  addEducation,
  editEducation,
  removeEducation,

  clearCertificates,
  addCertificate,
  editCertificate,
  removeCertificate,
} = educationSlice.actions;

export default educationSlice.reducer;
