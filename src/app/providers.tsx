'use client';

import {ThemeProvider} from 'next-themes';
import {PropsWithChildren} from "react";
import {AppContextProvider} from "@/lib/lang";

type Props = {
  options: {
    lang: string;
    dictionary: any;
  }
} & PropsWithChildren;

export function Providers({children, options}: Props){
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppContextProvider lang={options.lang} dict={options.dictionary}>
        {children}
      </AppContextProvider>
    // </ThemeProvider>
  )
}