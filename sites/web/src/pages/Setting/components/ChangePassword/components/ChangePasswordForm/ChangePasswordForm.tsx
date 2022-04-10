import React from 'react';
import {
  ChangePasswordReq,
  PATTERN_VALIDATION,
  userService,
} from '@ah-ticker/common';
import { useForm } from 'antd/lib/form/Form';
import { Button, Form, Input, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { StyleProps } from 'src/types';
import { useApp } from 'src/context';

const cx = classNames.bind({});

export const ChangePasswordForm: React.FC<StyleProps> = ({ className }) => {
  const { t } = useTranslation();

  const { setLoading } = useApp();

  const [form] = useForm<ChangePasswordReq>();

  const rules = {
    oldPassWord: [
      {
        transform: (value: string) => value?.trim(),
        required: true,
        message: t('FieldRequired', { field: t('OldPassword').toLowerCase() }),
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

          const password = form.getFieldValue('newPassword')?.trim();
          if (password !== value) {
            return Promise.reject(t('PasswordNotMatch'));
          }

          return Promise.resolve(value);
        },
      },
    ],
  };

  const onFinish = async (inputValue: ChangePasswordReq) => {
    setLoading(true);

    try {
      await userService.changePassword(inputValue);
      notification.success({ message: t('UpdateSuccess') });
      form.resetFields();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className={className}
      layout="vertical"
      form={form}
      onFinish={onFinish}
      validateTrigger="onSubmit"
    >
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
        className={cx('mb-24')}
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

      <Form.Item className={cx('mb-0')}>
        <Button type="primary" size="large" shape="round" htmlType="submit">
          {t('Save')}
        </Button>
      </Form.Item>
    </Form>
  );
};
