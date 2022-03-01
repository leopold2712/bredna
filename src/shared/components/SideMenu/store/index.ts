import { createSlice } from '@reduxjs/toolkit';
import { MenuPages, MenuSections, MenuTabs, SideMenuState } from '../models/SideMenuState';

const initialState: SideMenuState = {
  menuActivePage: MenuPages.None,
  menuActiveTab: MenuTabs.None,
  menuActiveSection: MenuSections.None,
  itemId: 0,
  selectedHub: 0,
};

const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    setMenuActivePage: (state, { payload }) => {
      state.selectedHub = payload.hub;
      state.menuActivePage = payload.page;
    },
    setMenuActiveTab: (state, { payload }) => {
      state.selectedHub = payload.hub;
      state.menuActiveTab = payload.tab;
    },
    setMenuActiveSection: (state, { payload }) => {
      state.selectedHub = payload.hub;
      state.menuActivePage = payload.page;
      state.menuActiveSection = payload.section;
    },
  },
});

export const { setMenuActivePage, setMenuActiveTab, setMenuActiveSection } = sideMenuSlice.actions;

export default sideMenuSlice.reducer;
