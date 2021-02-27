export const listToMap = <T>(list: T[], keyProp: string): Record<string, T> => {
  return list.reduce((result: Record<string, T>, current: any) => {
    result[current[keyProp]] = current
    return result
  }, {})
}
