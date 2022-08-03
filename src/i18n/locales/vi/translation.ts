import {
  detailTranslation,
  forgotPasswordTranslation,
  homeTranslation,
  resetPasswordTranslation,
  searchTranslation,
  settingTranslation,
  signinTranslation,
  signupTranslation,
  watchListTranslation,
} from './page';

export const translations = {
  BackToHome: 'Về trang chủ',
  WelcomeText: 'Xem thông tin cổ phiếu để lập kế hoạch đầu tư cho tương lai',

  Login: 'Đăng nhập',
  Register: 'Đăng ký',
  Logout: 'Đăng xuất',
  News: 'Tin tức',
  ChangePassword: 'Đổi mật khẩu',
  VerifyUser: 'Xác thực người dùng',

  NotReceiveMail: 'Không nhận được thư?',
  Resend: 'Gửi lại',

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
  CreateSuccessfully: 'Tạo mới thành công',
  UpdateSuccessfully: 'Cập nhật thành công',
  VerifySuccessfully: 'Xác thực thành công',
  SomethingWentWrong: 'Xảy ra vấn đề',
  YourSessionIsExpired: 'Phiên làm việc của bạn đã hết hạn',

  Discovery: 'Trang chủ',
  Watchlist: 'Danh mục đầu tư',

  Asc: 'Tăng dần',
  Desc: 'Giảm dần',
  Name: 'Tên',

  Personal: 'Cá nhân',
  Library: 'Thư viện',
  NotFoundFavoriteList: 'Chưa có danh mục đầu tư',
  AddTicker: 'Thêm mã cổ phiếu',
  SearchInFavoriteList: 'Tìm trong danh mục',

  Tickers: 'Danh sách mã cổ phiếu',
  List: 'Danh mục',
  Edit: 'Chỉnh sửa',
  EditFavoriteList: 'Chỉnh sửa danh mục đầu tư',

  eps: 'EPS (nghìn đồng)',
  bv: 'BV (nghìn đồng)',
  pe: 'P/E',
  roa: 'ROA (%)',
  roe: 'ROE (%)',
  ros: 'ROS (%)',
  gos: 'GOS (%)',
  dar: 'DAR (%)',
  short_term_asset: 'Tổng tài sản ngắn hạn',
  total_asset: 'Tổng tài sản',
  short_term_debt: 'Nợ ngắn hạn',
  total_debt: 'Tổng nợ',
  equity: 'Vốn chủ sở hữu',
  net_revenue: 'Doanh thu thuần',
  capital_cost: 'Giá vốn',
  gross_profit: 'Lợi nhuận gộp',
  financial_profit: 'Lợi nhuận tài chính',
  other_profit: 'Lợi nhuận khác',
  profit_before_tax: 'Lợi nhuận trước thuế',
  profit_after_tax: 'Lợi nhuận sau thuế',
  parent_company_profit_after_tax: 'Lợi nhuận sau thuế của công ty mẹ',
  gross_revenue: 'Tổng doanh thu',
  total_cost: 'Tổng lợi nhuận',
  net_profit: 'Lợi nhuận ròng',
  loan: 'Tiền cho vay',
  stock_investment: 'Đầu tư chứng khoán',
  capital_contribution_and_long_term_investment: 'Góp vốn và đầu tư dài hạn',
  deposits: 'Tiền gửi',
  capital_and_reserves: 'Vốn và các quỹ',
  FinancialIndexes: 'Chỉ số kĩ thuật',
  GetPredictedPrice: 'Lấy giá dự đoán',

  ...homeTranslation,
  ...signinTranslation,
  ...signupTranslation,
  ...forgotPasswordTranslation,
  ...resetPasswordTranslation,
  ...settingTranslation,
  ...searchTranslation,
  ...detailTranslation,
  ...watchListTranslation,
};
