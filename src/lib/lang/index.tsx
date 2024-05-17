'use client';
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {i18n} from "@/i18n.config";

export const LangContext = createContext<LangContext | null>(null);
const map = new Map<string, string>();


export const AppContextProvider = ({children, lang, dict}:AppContextProviderProps) => {
  const [state, setState] = useState<LangState>({lang, list: [...i18n.locales]});
  const [dictionary, setDictionary] = useState<any>(dict);

  useEffect(() => {
    if(!map.size) {
      map.set(state.lang, dict)
    } else if(map.has(state.lang)) {
      setDictionary(map.get(state.lang))
    } else {
      import(`@/dictionaries/${state.lang}.json`).then(module => {
        map.set(state.lang, module.default)
        setDictionary(module.default)
        fetch('/api/lang?lang='+state.lang, {method: 'PATCH'})
      })
    }
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