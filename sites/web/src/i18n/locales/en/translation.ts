import {
  forgotPasswordTranslation,
  homeTranslation,
  resetPasswordTranslation,
  searchTranslation,
  settingTranslation,
  signinTranslation,
  signupTranslation,
} from './page';

export const translations = {
  BackToHome: 'Back to Home',
  WelcomeText: 'Look for tickers and make an investigation plan for future',

  Signin: 'Sign in',
  Signup: 'Sign up',
  Logout: 'Logout',
  ResearchCenter: 'Research center',
  ChangePassword: 'Change password',
  VerifyUser: 'Verify user',

  NotReceiveMail: 'Not receive mail?',
  Resend: 'Resend.',

  Reset: 'Reset',
  Save: 'Save',

  // Form Field
  Email: 'Email',
  NewPassword: 'New password',
  Password: 'Password',
  ConfirmPassword: 'Confirm password',
  Username: 'Username',

  // Form placeholder
  EnterField: 'Enter {{field}}',

  // Form Error
  FieldMaxLength: '{{field}} can not exceed {{maxLength}} characters',
  FieldRequired: 'Please enter {{field}}',
  ErrorFormat: '{{field}} is not valid',
  ErrorPassword:
    'Password must have at least 8 characters, one uppercase letter, one lowercase letter and one number',
  PasswordNotMatch: 'Passwords do not match',

  // Notification
  CreateSuccess: 'Create successfully',
  UpdateSuccess: 'Update successfully',
  VerifySuccess: 'Verify successfully',
  SomethingWentWrong: 'Something went wrong',
  YourSessionIsExpired: 'Your session is expired',

  ...homeTranslation,
  ...signinTranslation,
  ...signupTranslation,
  ...forgotPasswordTranslation,
  ...resetPasswordTranslation,
  ...settingTranslation,
  ...searchTranslation,
};
