import { SkillDTO } from '../../../../feature/MyProfile/dto/UpdateMyProfileDTO';
import { CategoriesDTO, TimeZoneDTO } from '../../../dtos';
import { MainDTO } from '../../../dtos/MainDTO';
import { ProfessionalTitleDTO } from '../../../dtos/myProfile.dto';
import { SimpleType } from '../../../dtos/simple.dto';
import { CollegeDTO } from './college.dto';

export type MetaState = {
  searchCategories: CategoriesDTO[];
  categories: CategoriesDTO[];
  countries: MainDTO[];
  languages: MainDTO[];
  timezones: TimeZoneDTO[];
  degrees: SimpleType[];
  majors: SimpleType[];
  professionalTitles: ProfessionalTitleDTO[];
  skills: SkillDTO[];
  states: MainDTO[];
  colleges: CollegeDTO[];
};
