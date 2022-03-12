import { homeTranslation, loginTranslation } from './page';

export const translations = {
  BackToHome: 'Back to Home',
  WelcomeText: 'Look for tickers and make an investigation plan for future',

  Signin: 'Signin',
  Signup: 'Signup',

  // Form Field
  Email: 'Email',
  Password: 'Password',

  // Form placeholder
  EnterEmail: 'Enter email',
  EnterPassword: 'Enter password',

  // Form Error
  FieldMaxLength: '{{field}} can not exceed {{maxLength}} characters',
  FieldRequired: 'Please enter {{field}}',
  ErrorFormat: '{{field}} is not valid',

  ...homeTranslation,
  ...loginTranslation,
};
