import { Button, Divider, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { authService } from 'src/api';
import { FacebookButton, GoogleButton, Text } from 'src/components';
import {
  FORGOT_PASSWORD_PATH,
  PATTERN_VALIDATION,
  SIGNUP_PATH,
} from 'src/constants';
import { useApp, useAuth } from 'src/contexts';
import { LoginData } from 'src/types';

export const Signin: React.FC = () => {
  const { t } = useTranslation();
  const { setLoading } = useApp();
  const { updateToken } = useAuth();

  const [form] = useForm<LoginData>();

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
    password: [
      {
        transform: (value: string) => value?.trim(),
        required: true,
        message: t('FieldRequired', { field: t('Password').toLowerCase() }),
      },
    ],
  };

  const onFinish = async (data: LoginData) => {
    setLoading(true);

    try {
      const res = await authService.login(data);
      updateToken(res);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-100 m-auto">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <h2 className="mb-32">{t('WelcomeLogin')}</h2>

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
          <Form.Item
            className="mb-16"
            name="password"
            labelCol={{ span: 24 }}
            label={
              <div className="d-flex justify-content-between align-items-center">
                {t('Password')}
                <NavLink
                  to={FORGOT_PASSWORD_PATH}
                  className="text-500"
                  tabIndex={-1}
                >
                  {t('ForgotPassword')}
                </NavLink>
              </div>
            }
            rules={rules.password}
            required={false}
          >
            <Input.Password
              size="large"
              placeholder={t('EnterField', {
                field: t('Password').toLowerCase(),
              })}
            />
          </Form.Item>
          <Button
            className={'ml-auto d-block'}
            type="primary"
            size="large"
            shape="round"
            htmlType="submit"
          >
            {t('Login')}
          </Button>
        </Form>

        <Divider plain>{t('Or')}</Divider>

        <div
          className="d-flex flex-column align-items-center"
          style={{ rowGap: 16 }}
        >
          <FacebookButton />
          <GoogleButton />
        </div>
      </div>

      <Text fontWeight={500} className="text-center">
        {t('NotHaveAccount')}{' '}
        <NavLink to={SIGNUP_PATH} className="primary-color">
          {t('SignupNow')}
        </NavLink>
      </Text>
    </>
  );
};
