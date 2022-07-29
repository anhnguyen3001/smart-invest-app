import {  ForgetPasswordData } from 'src/types';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';
import { useApp } from 'src/contexts';
import { SuccessContent } from './components';
import { PATTERN_VALIDATION } from 'src/constants';
import { authService } from 'src/api';

export const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();

  const { setLoading } = useApp();

  const [isDone, setIsDone] = useState(false);

  const [form] = useForm<ForgetPasswordData>();

  const rules = {
    email: [
      {
        validator: async (_: any, value: string) => {
          value = value?.trim() || '';

          if (value.length > 255) {
            return Promise.reject(
              t('FieldMaxLength', { field: t('Email'), maxLength: 255 }),
            );
          }

          if (!value) {
            return Promise.reject(
              t('FieldRequired', { field: t('Email').toLowerCase() }),
            );
          }

          if (!PATTERN_VALIDATION.email.test(value)) {
            return Promise.reject(t('ErrorFormat', { field: t('Email') }));
          }

          return Promise.resolve(value);
        },
      },
    ],
  };

  const onFinish = async (inputValue: ForgetPasswordData) => {
    setLoading(true);

    try {
      await authService.forgetPassword({ email: inputValue.email?.trim() });
      setIsDone(true);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return isDone ? (
    <SuccessContent email={form.getFieldValue('email')} />
  ) : (
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
        name="email"
        label={t('Email')}
        rules={rules.email}
      >
        <Input
          size="large"
          placeholder={t('EnterField', { field: t('Email').toLowerCase() })}
        />
      </Form.Item>

      <Form.Item className="text-right mb-0">
        <Button type="primary" size="large" shape="round" htmlType="submit">
          {t('SendMail')}
        </Button>
      </Form.Item>
    </Form>
  );
};
