import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {i18n, Locale} from "@/i18n.config";

export async function PATCH(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lang = searchParams.get('lang') as Locale
  if(lang) {
    if(!i18n.locales.includes(lang)) return NextResponse.json({error: 'Invalid language'}, {status: 404})
    cookies().set('lang', lang, { path: '/' })
  }
  return NextResponse.json({lang})
}