import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Please enter your username'),
  password: Yup.string().required('Please enter your password'),
});

export const registerValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('User name is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
