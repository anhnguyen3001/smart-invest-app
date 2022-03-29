import { authApi } from '@ah-ticker/common';
import React from 'react';
import ReactGoogleLogin from 'react-google-login';
import { useTranslation } from 'react-i18next';
import { useApp, useAuth } from 'src/context';

export const GoogleButton: React.FC = () => {
  const { t } = useTranslation();

  const { setLoading } = useApp();
  const { updateToken } = useAuth();

  const responseGoogle = async (response: any) => {
    if (response.accessToken) {
      setLoading(true);
      try {
        const res = await authApi.loginGoogle(response.accessToken as string);
        updateToken(res);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ReactGoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
      onSuccess={responseGoogle}
      buttonText={t('SigninWithGoogle')}
    />
  );
};
