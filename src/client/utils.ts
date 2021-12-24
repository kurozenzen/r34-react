export type ParamsRecord = Record<string, string | number | boolean>

export const asString = (value: any): string => (typeof value === 'string' ? value : value.toString())

export const createSearchParams = (params: ParamsRecord) =>
  Object.entries(params).reduce((acc, [key, value]) => {
    acc.append(key, asString(value))
    return acc
  }, new URLSearchParams())

export const sha256 = async (value: string) => {
  const msgBuffer = new TextEncoder().encode(value)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}
