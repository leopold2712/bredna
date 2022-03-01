import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be 6 or more characters')
    .required('Password is a required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});
