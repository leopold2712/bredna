import { SimpleType } from './simple.dto';
import { MainDTO } from './MainDTO';

export type EducationDTO = {
  id?: number;
  start_year: number;
  graduation_year: number;
  degree: DegreeType;
  major: MajorType;
  majorId?: number;
  college: {
    id: number | null;
    name: string;
    country: MainDTO | null;
  };
  created_at?: string;
  _destroy?: boolean;
};

export type EducationDTOForUpdate = {
  id?: number;
  start_year: number;
  graduation_year: number;
  degree: string;
  major: string;
  college: string;
  created_at?: string;
  _destroy?: boolean;
};

export type DegreeType = {
  id?: number;
  name: string;
};

export type MajorType = {
  id?: number;
  name: string;
};
