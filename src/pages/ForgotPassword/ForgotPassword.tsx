import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { authService } from 'src/api';
import { Text } from 'src/components';
import { PATTERN_VALIDATION, SIGNIN_PATH } from 'src/constants';
import { useApp } from 'src/contexts';
import { ForgetPasswordData } from 'src/types';
import { ResetPasswordForm } from './components';

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

  return (
    <>
      <div className="m-auto w-100">
        {isDone ? (
          <ResetPasswordForm email={form.getFieldValue('email')} />
        ) : (
          <Form form={form} layout="vertical" onFinish={onFinish}>
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
                placeholder={t('EnterField', {
                  field: t('Email').toLowerCase(),
                })}
              />
            </Form.Item>

            <Form.Item className="text-right mb-0">
              <Button
                type="primary"
                size="large"
                shape="round"
                htmlType="submit"
              >
                {t('SendMail')}
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
      <Text fontWeight={500} className="text-center">
        {t('HaveAccount')}{' '}
        <NavLink to={SIGNIN_PATH} className="primary-color">
          {t('SigninNow')}
        </NavLink>
      </Text>
    </>
  );

  return isDone ? (
    <ResetPasswordForm email={form.getFieldValue('email')} />
  ) : (
    <Form form={form} layout="vertical" onFinish={onFinish}>
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
