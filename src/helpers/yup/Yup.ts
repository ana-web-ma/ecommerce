import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^\S*$/, 'Remove whitespace')
    .email('Incorrect email')
    .required('Email is a required field')
    .matches(
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Incorrect email',
    ),
  password: yup
    .string()
    .matches(/^\S*$/, 'Remove whitespace')
    .min(8, 'Password must be at least 8 characters')
    .required('Password is a required field')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&?*"])[a-zA-Z0-9!@#$%&?*]{8,30}$/,
      'Password must contain at least one uppercase letter, lowercase letter, digit, special character',
    ),
});
