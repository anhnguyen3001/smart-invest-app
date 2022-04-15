import {
  detailTranslation,
  forgotPasswordTranslation,
  homeTranslation,
  resetPasswordTranslation,
  searchTranslation,
  settingTranslation,
  signinTranslation,
  signupTranslation,
} from './page';

export const translations = {
  BackToHome: 'Về trang chủ',
  WelcomeText: 'Look for tickers and make an investigation plan for future',

  Signin: 'Đăng nhập',
  Signup: 'Đăng ký',
  Logout: 'Đăng xuất',
  ResearchCenter: 'Trung tâm phân tích',
  ChangePassword: 'Đổi mật khẩu',
  VerifyUser: 'Xác thực người dùng',

  NotReceiveMail: 'Không nhận được thư?',
  Resend: 'Gửi lại.',

  Reset: 'Đặt lại',
  Save: 'Lưu',

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

  // Notification
  CreateSuccess: 'Tạo mới thành công',
  UpdateSuccess: 'Cập nhật thành công',
  VerifySuccess: 'Xác thực thành công',
  SomethingWentWrong: 'Xảy ra vấn đề',
  YourSessionIsExpired: 'Phiên làm việc của bạn đã hết hạn',

  ...homeTranslation,
  ...signinTranslation,
  ...signupTranslation,
  ...forgotPasswordTranslation,
  ...resetPasswordTranslation,
  ...settingTranslation,
  ...searchTranslation,
  ...detailTranslation,
};
