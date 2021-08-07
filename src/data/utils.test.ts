import { Type } from 'typescript'
import { listToMap, parseUrl, versionToNumber } from './utils'

const litsToMapCases: Record<string, [{ name: string }[], Record<string, { name: string }>]> = {
  empty: [[], {}],
  'two elements': [[{ name: 'one' }, { name: 'two' }], { one: { name: 'one' }, two: { name: 'two' } }],
}

Object.entries(litsToMapCases).forEach(([testname, [list, expected]]) =>
  test(`listToMap: ${testname}`, () => {
    expect(listToMap(list, 'name')).toEqual(expected)
  })
)

const parseUrlCases: Record<string, [string, string | undefined]> = {
  empty: ['', undefined],
  url: ['https://site.mydomain.com/somepath#id?val=1', new URL('https://site.mydomain.com/somepath#id?val=1')],
  string: ['something', undefined],
}

Object.entries(parseUrlCases).forEach(([testname, [value, expected]]) =>
  test(`parseUrl: ${testname}`, () => {
    expect(parseUrl(value)).toEqual(expected)
  })
)

const versionToNumberCases: Record<string, [string, number]> = {
  basic: ['1.2.7', 127],
  weird: ['1.2.14', 1214],
}

Object.entries(versionToNumberCases).forEach(([testname, [value, expected]]) =>
  test(`versionToNumber: ${testname}`, () => {
    expect(versionToNumber(value)).toEqual(expected)
  })
)
