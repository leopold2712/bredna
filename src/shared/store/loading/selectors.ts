import { RootState } from '../../../main/store/rootReducer';

export const getGlobalLoading = (state: RootState): boolean => {
  let is = false;
  Object.keys(state.loading).forEach((key) => {
    is = is || state.loading[key];
  });
  return is;
};
