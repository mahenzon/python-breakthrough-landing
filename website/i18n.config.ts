import { ruPluralRule } from './i18n/pluralRules'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  pluralRules: {
    ru: ruPluralRule,
  },
}))
