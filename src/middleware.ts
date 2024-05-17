import {NextRequest, NextResponse} from "next/server";
import {i18n} from "@/i18n.config";
import {match as matchLocale} from '@formatjs/intl-localematcher'


const getInitialLocale = (request: NextRequest) => {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  // @ts-ignore
  const locales: string[] = i18n.locales
  const Negotiator = require('negotiator')
  const languages = new Negotiator({headers: negotiatorHeaders}).languages()
  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale || i18n.defaultLocale
}

function middleware(request: NextRequest) {
  const {value} = request.cookies.get('lang') || {} as any
  if(!value) {
    const initLang = getInitialLocale(request)
    const response = NextResponse.next()
    response.cookies.set({name: 'lang', value: initLang, path: '/'});
    return response
  }
  return null
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|api).*)", "/", "/(___api|trpc)(.*)" ]
};

export default middleware