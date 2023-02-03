import { LOCALE_ENGLISH_UNITED_STATES } from "constants/locales";
import { createContext, PropsWithChildren } from "react";

export const LocaleContext = createContext<string>(LOCALE_ENGLISH_UNITED_STATES);

export const LocaleProvider = ({ locale, children }: PropsWithChildren<{ locale: string }>) => (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);