import { PATTERN_VALIDATION } from '@ah-ticker/common';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FORGET_PASSWORD_PATH, SIGNUP_PATH } from 'src/constants';
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
              t('FieldMaxLength', { field: 'Email', maxLength: 255 }),
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
        <h2 className={cx('mb-32')}>{t('LoginToAHTicker')}</h2>

        <Form.Item
          className={cx('mb-16')}
          name="email"
          required
          label={t('Email')}
          rules={rules.email}
        >
          <Input size="large" placeholder={t('EnterEmail')} />
        </Form.Item>
        <Form.Item
          className={cx('mb-16')}
          name="password"
          label={t('Password')}
          rules={rules.password}
        >
          <Input size="large" placeholder={t('EnterPassword')} />
        </Form.Item>
        <Form.Item noStyle>
          <div
            className={cx(
              'd-flex',
              'justify-content-between',
              'align-items-center',
              'mt-16',
            )}
          >
            <NavLink to={FORGET_PASSWORD_PATH} className={cx('text-500')}>
              {t('ForgetPassword')}
            </NavLink>
            <Button type="primary" size="large" shape="round" htmlType="submit">
              {t('Login')}
            </Button>
          </div>
        </Form.Item>
      </Form>

      <div className={cx('text-500')}>
        {t('NotHaveAccount')}{' '}
        <NavLink to={SIGNUP_PATH} className={cx('text-500', 'primary-color')}>
          {t('Signup')}
        </NavLink>
      </div>
    </PublicLayout>
  );
};
