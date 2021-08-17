import * as r34 from 'r34-types'
import { parseUrl } from '../data/utils'
import {
  formatCount,
  formatDatetime,
  formatDuration,
  formatSource,
  formatTagname,
  formatTagnameAndCount,
  formatTime,
  formatUnit,
} from './formatting'

const formatCountCases: Record<string, [number, string]> = {
  zero: [0, '0'],
  one: [1, '1'],
  'just below 1K': [999, '999'],
  '1K': [1000, '1K'],
  '1K truncate': [1050, '1K'],
  'just below 1M': [999999, '999K'],
  '1M': [1000000, '1M'],
  '3M rounding': [3923123, '3M'],
}

Object.entries(formatCountCases).forEach(([testname, [value, expected]]) =>
  test(`formatCount: ${testname}`, () => {
    expect(formatCount(value)).toBe(expected)
  })
)

const formatTimeCases: Record<string, [number, string]> = {
  zero: [0, '0 ms'],
  ms: [123, '123 ms'],
  second: [1000, '1 second'],
  seconds: [12000, '12 seconds'],
  minute: [60000, '1 minute'],
  minutes: [120000, '2 minutes'],
  hour: [3600000, '1 hour'],
  hours: [7200000, '2 hours'],
  day: [85400000, '1 day'],
  days: [170800000, '2 days'],
  week: [604800000, '1 week'],
  weeks: [1209600000, '2 weeks'],
  months: [5259513600, '2 months'],
  year: [31557600000, '1 year'],
  years: [63115200000, '2 years'],
}

Object.entries(formatTimeCases).forEach(([testname, [value, expected]]) =>
  test(`formatTime: ${testname}`, () => {
    expect(formatTime(value)).toBe(expected)
  })
)

const formatDatetimeCases: Record<string, [Date, string]> = {
  basic: [new Date('1995-12-17T03:24'), '17/12/1995 03:24'],
}

Object.entries(formatDatetimeCases).forEach(([testname, [value, expected]]) =>
  test(`formatDatetime: ${testname}`, () => {
    expect(formatDatetime(value)).toBe(expected)
  })
)

const formatTagnameAndCountCases: Record<string, [[string, number | undefined], string]> = {
  'with count': [['tag1', 1], 'tag1 (1)'],
  'without count': [['tag1', undefined], 'tag1'],
  'name handling': [['Tag_1', 1], 'Tag 1 (1)'],
  'count handling': [['tag1', 1000], 'tag1 (1K)'],
}

Object.entries(formatTagnameAndCountCases).forEach(([testname, [[name, count], expected]]) =>
  test(`formatTagnameAndCount: ${testname}`, () => {
    expect(formatTagnameAndCount(name, count)).toBe(expected)
  })
)

const formatTagnameCases: Record<string, [string, string]> = {
  underlines: ['cool_tag_1', 'cool tag 1'],
  'source tags': ['source:patreon', 'patreon'],
  'rating tags': ['rating:safe', 'safe'],
}

Object.entries(formatTagnameCases).forEach(([testname, [value, expected]]) =>
  test(`formatTagname: ${testname}`, () => {
    expect(formatTagname(value)).toBe(expected)
  })
)

const formatDurationCases: Record<string, [number, string]> = {
  zero: [0, '0:00'],
  seconds: [13, '0:13'],
  minutes: [124, '2:04'],
  hours: [3712, '61:52'],
  'three digit minutes': [6000, '100:00'],
}

Object.entries(formatDurationCases).forEach(([testname, [value, expected]]) =>
  test(`formatDuration: ${testname}`, () => {
    expect(formatDuration(value)).toBe(expected)
  })
)

const formatSourceCases: Record<string, [string, string]> = {
  empty: ['', ''],
  url: ['https://site.mydomain.com/somepath#id?val=1', 'site.mydomain.com'],
  string: ['some show', 'some show'],
}

Object.entries(formatSourceCases).forEach(([testname, [value, expected]]) =>
  test(`formatSource: ${testname}`, () => {
    expect(formatSource(value)).toBe(expected)
  })
)

const formatUnitCases: Record<string, [[number, number, string], string]> = {
  'six packs': [[24, 6, 'pack'], '4 packs'],
}

Object.entries(formatUnitCases).forEach(([testname, [[value, unitSize, unit], expected]]) =>
  test(`formatUnit: ${testname}`, () => {
    expect(formatUnit(value, unitSize, unit)).toBe(expected)
  })
)
