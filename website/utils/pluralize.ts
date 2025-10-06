export type PluralForms = readonly [string, string, string]

export function getPluralForm(value: number, forms: PluralForms): string {
  const abs = Math.abs(value)
  const lastTwo = abs % 100
  if (lastTwo >= 11 && lastTwo <= 14)
    return forms[2]

  const last = abs % 10
  if (last === 1)
    return forms[0]
  if (last >= 2 && last <= 4)
    return forms[1]

  return forms[2]
}
