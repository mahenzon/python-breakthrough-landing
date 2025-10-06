import { ruPluralRule } from './pluralRules'

export default defineI18nConfig(() => ({
  locale: 'ru',
  pluralRules: {
    ru: ruPluralRule,
  },
}))
