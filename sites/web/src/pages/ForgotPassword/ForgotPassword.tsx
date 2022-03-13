import { PATTERN_VALIDATION, SendEmailForgotPassword } from '@ah-ticker/common';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components/elements';
import { PublicLayout } from 'src/layouts';

export const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();

  const [form] = useForm<SendEmailForgotPassword>();

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

  const onFinish = (data: SendEmailForgotPassword) => {
    console.log('submit ', data);
  };

  return (
    <PublicLayout>
      <Form
        className="m-auto w-100"
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <h2 className="mb-32">{t('ForgotPassword')}</h2>

        <Text className="mb-8">{t('SendConfirmationMail')}</Text>

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
    </PublicLayout>
  );
};
