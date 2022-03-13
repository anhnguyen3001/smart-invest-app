import {
  homeTranslation,
  signinTranslation,
  signupTranslation,
  forgotPasswordTranslation,
} from './page';

export const translations = {
  BackToHome: 'Về trang chủ',
  WelcomeText: 'Look for tickers and make an investigation plan for future',

  Signin: 'Đăng nhập',
  Signup: 'Đăng ký',

  Reset: 'Đặt lại',

  // Form Field
  Email: 'Email',
  NewPassword: 'Mật khẩu mới',
  Password: 'Mật khẩu',
  ConfirmPassword: 'Xác nhận mật khẩu',
  Username: 'Tên người dùng',

  // Form placeholder
  EnterField: 'Nhập {{field}}',

  // Form Error
  FieldMaxLength: '{{field}} không được vượt quá {{maxLength}} kí tự',
  FieldRequired: 'Vui lòng nhập {{field}}',
  ErrorFormat: '{{field}} không hợp lệ',
  ErrorPassword:
    'Mật khẩu cần có ít nhất 8 kí tự, 1 chữ hoa, 1 chữ thường và 1 số',
  PasswordNotMatch: 'Mật khẩu không khớp',

  ...homeTranslation,
  ...signinTranslation,
  ...signupTranslation,
  ...forgotPasswordTranslation,
};
