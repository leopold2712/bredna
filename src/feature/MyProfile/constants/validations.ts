import moment from 'moment';
import * as yup from 'yup';
import { phoneNumberRegEx } from './regEx';

export const schema = yup.object().shape(
  {
    first_name: yup.string().required('First name is required field'),
    last_name: yup.string().required('Last name is required field'),
    professional_title_id: yup.string().when('professional_title_text', {
      is: '',
      then: yup.string().required('Professional title is required field'),
      otherwise: yup.string().nullable(),
    }),
    professional_title_text: yup.string().when('professional_title_id', {
      is: '',
      then: yup.string().required('Professional title is required field'),
      otherwise: yup.string().nullable(),
    }),
    phone_number: yup.string().matches(phoneNumberRegEx, 'Wrong phone number'),
  },
  [['professional_title_id', 'professional_title_text']],
);

export const educationFormSchema = yup.object().shape({
  degree: yup.string().required('Degree is required field'),
  major: yup.string().required('Major is required field'), // field of study
  college: yup.string().required('University / college is required field'), // university / college
  start_year: yup
    .number()
    .min(1961, 'Start year must be greater than or equal to 1961')
    .max(moment().year(), `Start year must be less than or equal to ${moment().year()}`)
    .required('Start date is required field'),
  graduation_year: yup
    .number()
    .required('Graduation date is required field')
    .moreThan(yup.ref('start_year'), 'Graduation year must greater than start year'),
});
