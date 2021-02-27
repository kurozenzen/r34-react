/**
 * Converts a list of objects into a map.
 * @param list The original list
 * @param keyProp The keyProp parameter defines which property of the objects will be used as the index for the map
 */
export const listToMap = <T>(list: T[], keyProp: string): Record<string, T> => {
  return list.reduce((result: Record<string, T>, current: any) => {
    result[current[keyProp]] = current
    return result
  }, {})
}
