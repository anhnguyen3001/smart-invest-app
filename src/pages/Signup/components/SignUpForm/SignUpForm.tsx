import { Button, Form, Input, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { authService } from 'src/api';
import { PATTERN_VALIDATION } from 'src/constants';
import { useApp } from 'src/contexts';
import { SignupData } from 'src/types';

const cx = classNames.bind({});

interface SignUpFormProps {
  setEmail: (email: string) => void;
  setIsDone: (isDone: boolean) => void;
}

export const SignupForm: React.FC<SignUpFormProps> = ({
  setEmail,
  setIsDone,
}) => {
  const { t } = useTranslation();
  const { setLoading } = useApp();
  const history = useHistory();

  const [form] = useForm<SignupData>();

  const rules = {
    username: [
      {
        transform: (value: string) => value?.trim(),
        required: true,
        message: t('FieldRequired', { field: t('Username').toLowerCase() }),
      },
      {
        transform: (value: string) => value?.trim(),
        maxLength: 255,
        message: t('FieldMaxLength', { field: t('Username'), maxLength: 255 }),
      },
    ],
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

  const onValuesChange = (changedValue: Partial<SignupData>) => {
    if (changedValue.password !== undefined) {
      form.validateFields(['confirmPassword']);
    } else if (changedValue.confirmPassword !== undefined) {
      form.validateFields(['password']);
    }
  };

  const onFinish = async ({ username, email, ...rest }: SignupData) => {
    setLoading(true);

    const formattedEmail = email.trim();

    const submitData: SignupData = {
      username: username.trim(),
      email: formattedEmail,
      ...rest,
    };

    try {
      await authService.signup(submitData);

      notification.success({ message: t('SignUpSuccess') });

      setEmail(formattedEmail);
      setIsDone(true);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className={cx('w-100', 'm-auto')}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <h2 className={cx('mb-32')}>{t('WelcomeSignUp')}</h2>

      <Form.Item
        name="username"
        label={t('Username')}
        rules={rules.username}
        required={false}
      >
        <Input
          size="large"
          placeholder={t('EnterField', {
            field: t('Username').toLowerCase(),
          })}
        />
      </Form.Item>

      <Form.Item name="email" label={t('Email')} rules={rules.email}>
        <Input
          size="large"
          placeholder={t('EnterField', {
            field: t('Email').toLowerCase(),
          })}
        />
      </Form.Item>

      <Form.Item name="password" label={t('Password')} rules={rules.password}>
        <Input.Password
          size="large"
          placeholder={t('EnterField', {
            field: t('Password').toLowerCase(),
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

      <Form.Item className={cx('text-right', 'mb-0')}>
        <Button type="primary" size="large" shape="round" htmlType="submit">
          {t('Register')}
        </Button>
      </Form.Item>
    </Form>
  );
};
