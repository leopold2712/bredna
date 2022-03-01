import moment from 'moment';
import { EducationDTOForUpdate } from '../../../shared/dtos/education.dto';

export const emptyEducation: EducationDTOForUpdate = {
  degree: '',
  major: '',
  college: '',
  start_year: Number(moment().subtract(4, 'years').format('YYYY')),
  graduation_year: Number(moment().format('YYYY')),
};
