import * as yup from 'yup';

export const certificateFormSchema = yup.object().shape({
  title: yup.string().required('Title is required field'),
  description: yup.string().required('Issuing organization is required field'),
});
