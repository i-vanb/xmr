'use client';
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {log} from "node:util";

export const LangContext = createContext<LangContext | null>(null);

export const AppContextProvider = ({children, lang, dict}:AppContextProviderProps) => {
  const [state, setState] = useState<LangState>({lang, list: ['en', 'tr']});
  const [dictionary, setDictionary] = useState<any>(dict);

  useEffect(() => {
    import(`@/dictionaries/${state.lang}.json`).then(module => setDictionary(module.default))
  }, [state])

  const changeLanguage = (lang:string) => {
    if(!state.list.includes(lang)) return;
    setState(prev => ({...prev, lang}));
  }

  return (
    <LangContext.Provider value={{...state, changeLanguage, dictionary}}>
      {children}
    </LangContext.Provider>
  )
};


export const useLangContext = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useAppContext must be used within a LangContext");
  }
  return context;
}

type LangContext = {
  changeLanguage: (lang:string) => void;
  dictionary: any;
} & LangState;

type AppContextProviderProps = {
  children: ReactNode,
  lang: string;
  dict: any;
};

type LangState = {
  lang: string;
  list: string[];
}