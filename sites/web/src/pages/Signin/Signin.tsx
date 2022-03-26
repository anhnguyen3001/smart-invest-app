import { authApi, PATTERN_VALIDATION, LoginReq } from '@ah-ticker/common';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FORGOT_PASSWORD_PATH, SIGNUP_PATH } from 'src/constants';
import { useApp, useAuth } from 'src/context';
import { setLS } from 'src/helpers';

const cx = classNames.bind({});

export const Signin: React.FC = () => {
  const { t } = useTranslation();
  const { setLoading } = useApp();
  const { setAccessToken } = useAuth();

  const [form] = useForm<LoginReq>();

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

  const onFinish = async (data: LoginReq) => {
    setLoading(true);

    try {
      const res = await authApi.login(data);

      setAccessToken(res.accessToken);
      setLS('user', JSON.stringify(res));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        className={cx('w-100', 'm-auto')}
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <h2 className={cx('mb-32')}>{t('SigninToAHTicker')}</h2>

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
          label={t('Password')}
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
        <div
          className={cx(
            'd-flex',
            'justify-content-between',
            'align-items-center',
          )}
        >
          <NavLink to={FORGOT_PASSWORD_PATH} className={cx('text-500')}>
            {t('ForgotPassword')}
          </NavLink>
          <Button type="primary" size="large" shape="round" htmlType="submit">
            {t('Login')}
          </Button>
        </div>
      </Form>

      <div className={cx('text-500', 'text-center')}>
        {t('NotHaveAccount')}{' '}
        <NavLink to={SIGNUP_PATH} className={cx('text-500', 'primary-color')}>
          {t('SignupNow')}
        </NavLink>
      </div>
    </>
  );
};
