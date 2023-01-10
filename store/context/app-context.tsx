import { createContext, useState } from 'react';
import { View } from 'react-native';
import React from 'react';

export interface AppContextInterface {
  url?: string;
  setUrl?: React.Dispatch<React.SetStateAction<string | null>>;
  name?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
}

interface IPropsCtxChildren {
  children: React.ReactNode;
}
export const AppCtx = createContext<AppContextInterface | null>(null);

const AppContextProvider: React.FC<IPropsCtxChildren> = ({ children }) => {
  const [url, setUrl] = useState<string>('');
  const [name, setName] = useState<string>('');

  const value = {
    url: url,
    setUrl: setUrl,
    name: name,
    setName: setName,
  };

  return (
    <AppCtx.Provider value={value}>
      <>{children}</>
    </AppCtx.Provider>
  );
};

export default AppContextProvider;
