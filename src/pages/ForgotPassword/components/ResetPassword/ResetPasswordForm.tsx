import { Button, Form, Input, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { authService } from 'src/api';
import { CodeInput, Text } from 'src/components';
import { PATTERN_VALIDATION, SIGNIN_PATH } from 'src/constants';
import { useApp } from 'src/contexts';
import { ResetPasswordData } from 'src/types';

interface ResetPasswordFormProps {
  email: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
}) => {
  const { t } = useTranslation();

  const history = useHistory();

  const { setLoading } = useApp();

  const [form] = useForm<ResetPasswordData>();

  const rules = {
    code: [
      {
        transform: (value: string) => value?.trim(),
        required: true,
        message: t('FieldRequired', { field: t('Code').toLowerCase() }),
      },
    ],
    newPassword: [
      {
        validator: async (_: any, value: string) => {
          value = value?.trim() || '';

          if (value.length > 255) {
            return Promise.reject(
              t('FieldMaxLength', { field: t('Password'), maxLength: 255 }),
            );
          }

          if (!value) {
            return Promise.reject(
              t('FieldRequired', { field: t('Password').toLowerCase() }),
            );
          }

          if (!PATTERN_VALIDATION.password.test(value)) {
            return Promise.reject(t('ErrorPassword'));
          }

          return Promise.resolve(value);
        },
      },
    ],
    confirmPassword: [
      {
        validator: async (_: any, value: string) => {
          value = value?.trim() || '';

          const password = form.getFieldValue('password')?.trim();
          if (password !== value) {
            return Promise.reject(t('PasswordNotMatch'));
          }

          return Promise.resolve(value);
        },
      },
    ],
  };

  const onFinish = async (data: ResetPasswordData) => {
    setLoading(true);

    try {
      await authService.resetPassword(data);

      notification.success({ message: t('ResetPasswordSuccess') });

      setLoading(false);

      history.push(SIGNIN_PATH);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <h2 className="mb-32">{t('ResetPassword')}</h2>
      <Text level={2} className="mb-24">
        {t('SendResetPassMail')}
      </Text>
      <CodeInput
        email={email}
        formItemProps={{
          name: 'code',
          rules: rules.code,
        }}
      />

      <Form.Item
        className="mb-16"
        name="newPassword"
        label={t('NewPassword')}
        rules={rules.newPassword}
      >
        <Input.Password
          size="large"
          placeholder={t('EnterField', {
            field: t('NewPassword').toLowerCase(),
          })}
        />
      </Form.Item>
      <Form.Item
        className="mb-16"
        name="confirmPassword"
        label={t('ConfirmPassword')}
        rules={rules.confirmPassword}
      >
        <Input.Password
          size="large"
          placeholder={t('EnterField', {
            field: t('ConfirmPassword').toLowerCase(),
          })}
        />
      </Form.Item>
      <Form.Item className="text-right mb-0">
        <Button type="primary" size="large" shape="round" htmlType="submit">
          {t('Reset')}
        </Button>
      </Form.Item>
    </Form>
  );
};
