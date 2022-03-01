export type UpdateEducationDTO = {
  id?: number;
  start_year: number;
  graduation_year: number;
  degree: string;
  major: string;
  college: string;
  created_at?: string;
  _destroy?: boolean;
};
