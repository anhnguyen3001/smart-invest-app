import { LoginData } from 'src/types';
import { Button, Divider, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FacebookButton, GoogleButton } from 'src/components';
import {
  FORGOT_PASSWORD_PATH,
  PATTERN_VALIDATION,
  SIGNUP_PATH,
} from 'src/constants';
import { useApp, useAuth } from 'src/contexts';
import { authService } from 'src/api';

const cx = classNames.bind({});

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
      <div className={cx('w-100', 'm-auto')}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <h2 className={cx('mb-32')}>{t('WelcomeLogin')}</h2>

          <Form.Item
            className={cx('mb-16')}
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
            className={cx('mb-16')}
            name="password"
            label={
              <div
                className={cx(
                  'd-flex',
                  'justify-content-between',
                  'align-items-center',
                )}
              >
                {t('Password')}
                <NavLink
                  to={FORGOT_PASSWORD_PATH}
                  className={cx('text-500')}
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
            className={cx('ml-auto', 'd-block')}
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
          className={cx('d-flex', 'flex-column', 'align-items-center')}
          style={{ rowGap: 16 }}
        >
          <FacebookButton />
          <GoogleButton />
        </div>
      </div>

      <div className={cx('text-500', 'text-center')}>
        {t('NotHaveAccount')}{' '}
        <NavLink to={SIGNUP_PATH} className={cx('text-500', 'primary-color')}>
          {t('SignupNow')}
        </NavLink>
      </div>
    </>
  );
};
