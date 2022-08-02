import { Button, Form, Input, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { authService } from 'src/api';
import { CodeInput, Text } from 'src/components';
import { PATTERN_VALIDATION, SIGNIN_PATH } from 'src/constants';
import { useApp } from 'src/contexts';
import { MailEnum, ResetPasswordData } from 'src/types';

type FormProps = Omit<ResetPasswordData, 'email'>;

interface ResetPasswordFormProps {
  email: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
}) => {
  const { t } = useTranslation();

  const history = useHistory();

  const { setLoading } = useApp();

  const [form] = useForm<FormProps>();

  const rules = {
    code: [
      {
        transform: (value: string) => value?.trim(),
        required: true,
        message: t('FieldRequired', { field: t('Code').toLowerCase() }),
      },
    ],
    password: [
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

  const onFinish = async (data: FormProps) => {
    setLoading(true);

    try {
      await authService.resetPassword({ ...data, email });

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
        type={MailEnum.resetPassword}
        email={email}
        formItemProps={{
          name: 'code',
          rules: rules.code,
        }}
      />

      <Form.Item
        className="mb-16"
        name="password"
        label={t('NewPassword')}
        rules={rules.password}
      >
        <Input.Password
          size="large"
          placeholder={t('EnterField', {
            field: t('password').toLowerCase(),
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
