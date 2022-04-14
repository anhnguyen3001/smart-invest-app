import React, { useContext, useState } from 'react';

interface AppState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AppStateContext = React.createContext<AppState | null>(null);

export const AppProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <AppStateContext.Provider value={{ loading, setLoading }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useApp = (): AppState => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error(
      'useApp must be inside a AppStateContext with a state value',
    );
  }
  return context;
};
