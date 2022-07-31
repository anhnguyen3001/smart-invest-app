import { Button, Form, notification } from 'antd';
import classNames from 'classnames/bind';
import { t } from 'i18next';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from 'src/api';
import { CodeInput, Text } from 'src/components';
import { SIGNIN_PATH } from 'src/constants';
import { useApp } from 'src/contexts';
import { VerifyUserData } from 'src/types';

const cx = classNames.bind({});

interface VerifyFormProps {
  email: string;
}

export const VerifyForm: React.FC<VerifyFormProps> = ({ email }) => {
  const { setLoading } = useApp();

  const history = useHistory();

  const [form] = Form.useForm<VerifyUserData>();

  const rules = {
    code: [
      {
        transform: (value: string) => value?.trim(),
        required: true,
        message: t('FieldRequired', { field: t('code').toLowerCase() }),
      },
      {
        transform: (value: string) => value?.trim(),
        maxLength: 6,
        message: t('FieldMaxLength', { field: t('Code'), maxLength: 6 }),
      },
    ],
  };

  const onFinish = async ({ code }: VerifyUserData) => {
    setLoading(true);

    const submitData: VerifyUserData = {
      code: code.trim(),
      email: email.trim(),
    };

    try {
      await authService.verifyUser(submitData);
      notification.success({ message: t('VerifySuccess') });
      history.push(SIGNIN_PATH);
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
    >
      <h2 className={cx('mb-32')}>{t('VerifyUser')}</h2>
      <Text level={2} className={cx('mb-16')}>
        {t('SendVerifyMail')}
      </Text>

      <CodeInput
        email={email}
        formItemProps={{ name: 'code', rules: rules.code }}
      />

      <Form.Item className={cx('text-right', 'mb-0')}>
        <Button type="primary" size="large" shape="round" htmlType="submit">
          {t('Confirm')}
        </Button>
      </Form.Item>
    </Form>
  );
};
