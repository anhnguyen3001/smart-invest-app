import { LoginMethodEnum } from '@ah-ticker/common';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';
import { useAuth } from 'src/context';
import { StyleProps } from 'src/types';
import { ChangePasswordForm } from './components';

export const ChangePassword: React.FC<StyleProps> = ({ className }) => {
  const { t } = useTranslation();

  const { user } = useAuth();

  return user?.method === LoginMethodEnum.local ? (
    <ChangePasswordForm className={className} />
  ) : (
    <Text className={className} level={2} type="secondary">
      {t('NotAvailableForLoginMethod')}
    </Text>
  );
};
