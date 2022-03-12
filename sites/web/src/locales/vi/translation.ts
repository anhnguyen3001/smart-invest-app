import { homeTranslation, loginTranslation } from './page';

export const translations = {
  BackToHome: 'Về trang chủ',
  WelcomeText: 'Look for tickers and make an investigation plan for future',

  Signin: 'Đăng nhập',
  Signup: 'Đăng ký',

  // Form Field
  Email: 'Email',
  Password: 'Mật khẩu',

  // Form placeholder
  EnterEmail: 'Nhập email',
  EnterPassword: 'Nhập mật khẩu',

  // Form Error
  FieldMaxLength: '{{field}} không được vượt quá {{maxLength}} kí tự',
  FieldRequired: 'Vui lòng nhập {{field}}',
  ErrorFormat: '{{field}} không hợp lệ',

  ...homeTranslation,
  ...loginTranslation,
};
