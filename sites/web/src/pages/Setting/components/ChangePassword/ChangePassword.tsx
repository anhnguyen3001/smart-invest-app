import { LoginMethodEnum } from '@ah-ticker/common';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';
import { useAuth } from 'src/contexts';
import { StyleProps } from 'src/types';
import { ChangePasswordForm } from './ChangePasswordForm';

export const ChangePassword: React.FC<StyleProps> = ({ className }) => {
  const { t } = useTranslation();

  const { user } = useAuth();

  return user?.method === LoginMethodEnum.local ? (
    <ChangePasswordForm className={className} />
  ) : (
    <Text className={className} level={2}>
      {t('NotAvailableForLoginMethod')}
    </Text>
  );
};
