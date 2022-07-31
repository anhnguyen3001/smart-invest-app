import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Text } from 'src/components';
import { SIGNIN_PATH } from 'src/constants';
import { SignupForm, VerifyForm } from './components';

export const Signup: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isDone, setIsDone] = useState(false);

  return (
    <>
      {isDone ? (
        <VerifyForm email={email} />
      ) : (
        <SignupForm setEmail={setEmail} setIsDone={setIsDone} />
      )}

      <Text fontWeight={500} className="text-center">
        {t('HaveAccount')}{' '}
        <NavLink to={SIGNIN_PATH} className="primary-color">
          {t('SigninNow')}
        </NavLink>
      </Text>
    </>
  );
};
