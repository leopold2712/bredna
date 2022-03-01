import { MainDTO } from './MainDTO';

export type CategoriesDTO = Omit<MainDTO, 'iso'> & {
  description: string;
  icon: string;
  is_root: boolean;
};
