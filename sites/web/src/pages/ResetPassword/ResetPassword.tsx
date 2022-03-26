import { PATTERN_VALIDATION, SetNewPassword } from '@ah-ticker/common';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading, Text } from 'src/components';

export const ResetPassword: React.FC = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [form] = useForm<SetNewPassword>();

  const rules = {
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

  const onFinish = (data: SetNewPassword) => {
    console.log('submit ', data);
  };

  return (
    <Loading loading={loading}>
      <Form
        className="m-auto w-100"
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <h2 className="mb-32">{t('ForgotPassword')}</h2>

        <Text className="mb-16">{t('SendConfirmationMail')}</Text>

        <Form.Item
          className="mb-16"
          name="password"
          label={t('NewPassword')}
          rules={rules.password}
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
    </Loading>
  );
};
