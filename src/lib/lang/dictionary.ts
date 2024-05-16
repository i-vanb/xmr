import 'server-only'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  tr: () => import('@/dictionaries/tr.json').then(module => module.default)
}

// @ts-ignore
export const getDictionary = async (locale: string) => dictionaries[locale]()