import {
  authService,
  PATTERN_VALIDATION,
  ResetPasswordData,
} from '@smart-invest/common';
import { Button, Form, Input, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { SIGNIN_PATH } from 'src/constants';
import { useApp } from 'src/contexts';
import { useQuery } from 'src/hooks';

export const ResetPassword: React.FC = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const { setLoading } = useApp();

  const query = useQuery();
  const code = query.get('code') || '';

  const [form] = useForm<ResetPasswordData>();

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

  const onFinish = async (data: ResetPasswordData) => {
    setLoading(true);

    try {
      await authService.resetPassword(code, data);

      notification.success({ message: t('ResetPasswordSuccess') });

      setLoading(false);

      history.push(SIGNIN_PATH);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Form
      className="m-auto w-100"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      validateTrigger="onFinish"
    >
      <h2 className="mb-32">{t('ResetPassword')}</h2>

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
  );
};
