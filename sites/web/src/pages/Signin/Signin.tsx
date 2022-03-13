import { PATTERN_VALIDATION } from '@ah-ticker/common';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FORGOT_PASSWORD_PATH, SIGNUP_PATH } from 'src/constants';
import { PublicLayout } from 'src/layouts';

const cx = classNames.bind({});

interface SigninFormField {
  email: string;
  password: string;
}

export const Signin: React.FC = () => {
  const { t } = useTranslation();

  const [form] = useForm<SigninFormField>();

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

  const onFinish = (data: SigninFormField) => {
    console.log('data ', data);
  };

  return (
    <PublicLayout>
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

      <div className={cx('text-500')}>
        {t('NotHaveAccount')}{' '}
        <NavLink to={SIGNUP_PATH} className={cx('text-500', 'primary-color')}>
          {t('SignupNow')}
        </NavLink>
      </div>
    </PublicLayout>
  );
};
