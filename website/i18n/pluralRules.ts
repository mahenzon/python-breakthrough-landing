export function ruPluralRule(choice: number): number {
  const name = new Intl.PluralRules('ru-RU').select(choice)

  return {
    zero: -1,
    one: 1,
    two: -1,
    few: 2,
    many: 0,
    other: -1,
  }[name]
}
