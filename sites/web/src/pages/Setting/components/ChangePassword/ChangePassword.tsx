import React from 'react';
import {
  ChangePassword as ChangePasswordReq,
  PATTERN_VALIDATION,
} from '@ah-ticker/common';
import { useForm } from 'antd/lib/form/Form';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

export const ChangePassword: React.FC = () => {
  const { t } = useTranslation();

  const [form] = useForm<ChangePasswordReq>();

  const rules = {
    oldPassWord: [
      {
        transform: (value: string) => value?.trim(),
        required: true,
        message: t('FieldRequired', { field: t('OldPassword').toLowerCase() }),
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

  return (
    <Form layout="vertical" form={form}>
      <Form.Item
        name="oldPassword"
        label={t('OldPassword')}
        rules={rules.oldPassWord}
        required={false}
      >
        <Input.Password
          size="large"
          placeholder={t('EnterField', {
            field: t('OldPassword').toLowerCase(),
          })}
        />
      </Form.Item>

      <Form.Item
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
        className="mb-24"
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

      <Form.Item className="mb-0">
        <Button type="primary" size="large" shape="round" htmlType="submit">
          {t('Save')}
        </Button>
      </Form.Item>
    </Form>
  );
};