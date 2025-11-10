import React, { createContext, useContext, useEffect, useState } from 'react';
import { i18nService } from '@bootstrapping/services/i18n.bootstrapable';
import i18next from 'i18next';

interface I18nContextProps {
  i18n: typeof i18next;
  t: typeof i18next.t;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{ lang: string; children: React.ReactNode }> = ({ lang, children }) => {
  const [i18nInstance] = useState(() => i18nService.i18n.cloneInstance());

  useEffect(() => {
    i18nInstance.changeLanguage(lang);
  }, [lang, i18nInstance]);

  return <I18nContext.Provider value={{ i18n: i18nInstance, t: i18nInstance.t }}>{children}</I18nContext.Provider>;
};

export const useI18n = (): any => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
