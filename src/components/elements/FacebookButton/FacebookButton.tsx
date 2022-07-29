import { FacebookFilled } from '@ant-design/icons';
import classNames from 'classnames/bind';
import React from 'react';
import ReactFacebookLogin from 'react-facebook-login';
import { useTranslation } from 'react-i18next';
import { authService } from 'src/api';
import { useApp, useAuth } from 'src/contexts';
import { getEnv } from 'src/helpers';
import { StyleProps } from 'src/types';
import styles from './FacebookButton.module.scss';

const cx = classNames.bind(styles);

export const FacebookButton: React.FC<StyleProps> = ({ className }) => {
  const { t } = useTranslation();
  const { setLoading } = useApp();

  const { updateToken } = useAuth();

  const responseFacebook = async (response: any) => {
    if (response.accessToken) {
      setLoading(true);
      try {
        const res = await authService.loginFB(response.accessToken as string);
        updateToken(res);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ReactFacebookLogin
      appId={getEnv('FB_APP_ID')}
      callback={responseFacebook}
      icon={<FacebookFilled style={{ fontSize: 24, marginRight: 8 }} />}
      cssClass={cx('button')}
      textButton={t('SigninWithFacebook')}
    />
  );
};
