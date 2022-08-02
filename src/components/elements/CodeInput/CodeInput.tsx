import { Button, Form, FormItemProps, Input, notification } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authService } from 'src/api';
import { MailEnum } from 'src/types';

interface CodeInputProps {
  email: string;
  formItemProps: FormItemProps;
  type: MailEnum;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  formItemProps,
  email,
  type,
}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const onResendMail = async () => {
    setLoading(true);

    try {
      if (type === MailEnum.verifyUser) {
        await authService.resendVerify({ email });
      } else {
        await authService.resendResetPassword({ email });
      }
      notification.success({ message: t('ResendMailSuccess') });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Item className="mb-16" label={t('Code')} {...formItemProps}>
      <Input
        size="large"
        placeholder={t('EnterField', {
          field: t('Code').toLowerCase(),
        })}
        suffix={
          <Button
            type="link"
            onClick={onResendMail}
            disabled={loading}
            className="px-0"
          >
            {t('Resend')}
          </Button>
        }
      />
    </Form.Item>
  );
};
