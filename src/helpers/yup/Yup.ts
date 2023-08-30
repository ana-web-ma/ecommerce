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
    .required('Password is a required field')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&?*"])[a-zA-Z0-9!@#$%&?*]{4,30}$/,
      'Password must contain at least one uppercase letter, lowercase letter, digit, special character',
    )
    .min(8, 'Password must be at least 8 characters'),
});

const todayValue = new Date();
todayValue.setFullYear(todayValue.getFullYear() - 13);

export const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^(?! )(?!.* $).*$/, 'Remove whitespace')
    .email('Incorrect email')
    .required('Email is a required field')
    .matches(
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Incorrect email',
    ),
  password: yup
    .string()
    .matches(/^\S*$/, 'Remove whitespace')
    .required('Password is a required field')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&?*"])[a-zA-Z0-9!@#$%&?*]{4,30}$/,
      'Password must contain at least one uppercase letter, lowercase letter, digit, special character',
    )
    .min(8, 'Password must be at least 8 characters'),
  newPassword: yup
    .string()
    .matches(/^\S*$/, 'Remove whitespace')
    .required('Password is a required field')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&?*"])[a-zA-Z0-9!@#$%&?*]{4,30}$/,
      'Password must contain at least one uppercase letter, lowercase letter, digit, special character',
    )
    .min(8, 'Password must be at least 8 characters'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Password is a required field')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&?*"])[a-zA-Z0-9!@#$%&?*]{4,30}$/,
      'Password must contain at least one uppercase letter, lowercase letter, digit, special character',
    )
    .min(8, 'Password must be at least 8 characters'),
  oldPassword: yup
    .string()
    .matches(/^\S*$/, 'Remove whitespace')
    .required('Password is a required field')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&?*"])[a-zA-Z0-9!@#$%&?*]{4,30}$/,
      'Password must contain at least one uppercase letter, lowercase letter, digit, special character',
    )
    .min(8, 'Password must be at least 8 characters'),
  firstName: yup
    .string()
    .matches(/^(?! )(?!.* $).*$/, 'Remove whitespace')
    .required('This is a required field')
    .matches(
      /^[a-zA-Zа-яА-ЯàâäçéèêëîïôœùûüÿÀÂÄÇÉÈÊËÎÏÔŒÙÛÜŸ]+$/,
      'Must contain at least one character and no special characters or numbers',
    ),
  lastName: yup
    .string()
    .matches(/^(?! )(?!.* $).*$/, 'Remove whitespace')
    .required('This is a required field')
    .matches(
      /^[a-zA-Zа-яА-ЯàâäçéèêëîïôœùûüÿÀÂÄÇÉÈÊËÎÏÔŒÙÛÜŸ]+$/,
      'Must contain at least one character and no special characters or numbers',
    ),
  post1: yup
    .string()
    .matches(/^\S*$/, 'Remove whitespace')
    .required('This is a required field')
    .matches(/^\d{5}$/, 'Must be a five digit number'),
  post2: yup
    .string()
    .matches(/^\S*$/, 'Remove whitespace')
    .required('This is a required field')
    .matches(/^\d{5}$/, 'Must be a five digit number'),
  street1: yup
    .string()
    .matches(/^(?! )(?!.* $).*$/, 'Remove whitespace')
    .required('This is a required field')
    .matches(/.+/, 'Must contain at least one character'),
  street2: yup
    .string()
    .matches(/^(?! )(?!.* $).*$/, 'Remove whitespace')
    .required('This is a required field')
    .matches(/.+/, 'Must contain at least one character'),
  city1: yup
    .string()
    .matches(/^(?! )(?!.* $).*$/, 'Remove whitespace')
    .required('This is a required field')
    .matches(
      /^[a-zA-Zа-яА-ЯàâäçéèêëîïôœùûüÿÀÂÄÇÉÈÊËÎÏÔŒÙÛÜŸ]+$/,
      'Must contain at least one character and no special characters or numbers',
    ),
  city2: yup
    .string()
    .matches(/^(?! )(?!.* $).*$/, 'Remove whitespace')
    .required('This is a required field')
    .matches(
      /^[a-zA-Zа-яА-ЯàâäçéèêëîïôœùûüÿÀÂÄÇÉÈÊËÎÏÔŒÙÛÜŸ]+$/,
      'Must contain at least one character and no special characters or numbers',
    ),
  country1: yup.string().required('This is a required field'),
  country2: yup.string().required('This is a required field'),
  date: yup
    .date()
    .required('This is a required field')
    .max(todayValue, 'You must be over 13 years old'),
});
