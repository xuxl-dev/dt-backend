const validators = {
  String: (x: any) => typeof x === 'string',
  Number: (x: any) => typeof x === 'number',
}

export function tryGetValidator(type: string | undefined) {
  if (!type) {
    return null
  }
  return validators[type] ?? null
}
