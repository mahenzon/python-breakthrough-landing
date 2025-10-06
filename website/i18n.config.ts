export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  pluralRules: {
    ru: (choice: number, choicesLength: number) => {
      // 0 -> "Модулей"
      if (choice === 0) {
        return 0
      }

      const lastTwo = choice % 100
      const lastOne = choice % 10

      // 11-14, 111-114, etc -> "Модулей"
      if (lastTwo >= 11 && lastTwo <= 14) {
        return choicesLength < 4 ? 2 : 3
      }

      // 1, 21, 31, 101, etc -> "Модуль"
      if (lastOne === 1) {
        return 1
      }

      // 2-4, 22-24, 32-34, etc -> "Модуля"
      if (lastOne >= 2 && lastOne <= 4) {
        return 2
      }

      // 5-20, 25-30, etc -> "Модулей"
      return choicesLength < 4 ? 2 : 3
    },
  },
}))
