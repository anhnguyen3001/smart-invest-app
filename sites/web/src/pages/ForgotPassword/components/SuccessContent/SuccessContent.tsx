import { MailEnum, authApi } from '@ah-ticker/common';
import { notification } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';
import { useApp } from 'src/context';

const cx = classNames.bind({});

interface SuccessContentProps {
  email: string;
}

export const SuccessContent: React.FC<SuccessContentProps> = ({ email }) => {
  const { t } = useTranslation();
  const { setLoading } = useApp();

  const onResendMail = async () => {
    setLoading(true);
    try {
      await authApi.resendMail({ email, type: MailEnum.resetPassword });
      notification.success({ message: t('ResendMailSuccess') });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cx('h-100', 'd-flex', 'justify-content-center', 'flex-column')}
    >
      <h2 className={cx('mb-32', 'primary-color')}>{t('SendMailSuccess')}</h2>
      <Text level={2}>{t('SendResetPassMail')}</Text>
      <div className={cx('text-500', 'mt-24')}>
        {t('NotReceiveMail')}{' '}
        <Text
          className={cx('cursor-pointer')}
          type="link"
          block={false}
          onClick={onResendMail}
        >
          {t('Resend')}
        </Text>
      </div>
    </div>
  );
};
