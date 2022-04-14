import { User, Tokens, userService } from '@ah-ticker/common';
import React, { useContext, useEffect, useState } from 'react';
import { getAccessToken, setLS } from 'src/helpers';
import { useApp } from './AppContext';

interface AuthState {
  user?: User;
  setUser: (user: User) => void;
  getUserInfo: () => Promise<void>;
  accessToken?: string;
  setAccessToken: (token: string) => void;
  updateToken: (tokens: Tokens) => void;
  logout: () => void;
}

const AuthStateContext = React.createContext<AuthState | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const { setLoading } = useApp();

  const [user, setUser] = useState<User>();
  const [accessToken, setAccessToken] = useState<string>(getAccessToken());

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const res = await userService.getMe();
      setUser(res.user);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUserInfo();
    }
    // eslint-disable-next-line
  }, [accessToken]);

  const updateToken = (tokens: Tokens) => {
    setAccessToken(tokens.accessToken);
    setLS('user', JSON.stringify(tokens));
  };

  const logout = async () => {
    localStorage.removeItem('user');
    setAccessToken('');
    setUser(undefined);
  };

  return (
    <AuthStateContext.Provider
      value={{
        user,
        setUser,
        getUserInfo,
        accessToken,
        setAccessToken,
        logout,
        updateToken,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error(
      'useAuth must be inside a AuthStateContext with a state value',
    );
  }
  return context;
};
