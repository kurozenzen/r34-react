import * as r34 from 'r34-types'
import { flattenSupertags, getTagParameter, groupTagsByModifier, serializeAllTags, serializeTag } from './tagUtils'

const serializeCases: Record<string, { tag: r34.QueryTag; expected: string }> = {
  '+ tag': { tag: { modifier: '+', name: 'tag' }, expected: 'tag' },
  '- tag': { tag: { modifier: '-', name: 'tag' }, expected: '-tag' },
  '~ tag': { tag: { modifier: '+', name: 'tag' }, expected: 'tag' },
}

Object.entries(serializeCases).forEach(([testname, { tag, expected }]) =>
  test(`serializeTag: ${testname}`, () => {
    expect(serializeTag(tag)).toBe(expected)
  })
)

const groupTagsCases: Record<string, { tags: r34.QueryTag[]; expected: Record<r34.TagModifier, r34.QueryTag[]> }> = {
  'one tag': {
    tags: [{ modifier: '+', name: 'tag' }],
    expected: { '+': [{ modifier: '+', name: 'tag' }], '-': [], '~': [] },
  },
  'mixed tags': {
    tags: [
      { modifier: '+', name: 'tag' },
      { modifier: '-', name: 'tag2' },
      { modifier: '+', name: 'tag3' },
      { modifier: '~', name: 'tag5' },
      { modifier: '~', name: 'tag4' },
    ],
    expected: {
      '+': [
        { modifier: '+', name: 'tag' },
        { modifier: '+', name: 'tag3' },
      ],
      '-': [{ modifier: '-', name: 'tag2' }],
      '~': [
        { modifier: '~', name: 'tag5' },
        { modifier: '~', name: 'tag4' },
      ],
    },
  },
  'no tags': {
    tags: [],
    expected: {
      '+': [],
      '-': [],
      '~': [],
    },
  },
}

Object.entries(groupTagsCases).forEach(([testname, { tags, expected }]) =>
  test(`groupTagsByModifier: ${testname}`, () => {
    expect(groupTagsByModifier(tags)).toEqual(expected)
  })
)

const flattenSupertagsCases: Record<
  string,
  { tags: Array<r34.QueryTag | r34.Supertag>; expected: Array<r34.QueryTag> }
> = {
  'one supertag': {
    tags: [{ name: 'supertag', description: '', tags: { tag1: '+', tag2: '-' } }],
    expected: [
      { modifier: '+', name: 'tag1' },
      { modifier: '-', name: 'tag2' },
    ],
  },
  'mixed tags': {
    tags: [
      { name: 'supertag', description: '', tags: { tag1: '+', tag2: '-' } },
      { name: 'tag3', modifier: '-' },
    ],
    expected: [
      { modifier: '+', name: 'tag1' },
      { modifier: '-', name: 'tag2' },
      { modifier: '-', name: 'tag3' },
    ],
  },
  'no supertags': {
    tags: [
      { modifier: '+', name: 'tag1' },
      { modifier: '-', name: 'tag2' },
      { modifier: '-', name: 'tag3' },
    ],
    expected: [
      { modifier: '+', name: 'tag1' },
      { modifier: '-', name: 'tag2' },
      { modifier: '-', name: 'tag3' },
    ],
  },
  'no tags': { tags: [], expected: [] },
}

Object.entries(flattenSupertagsCases).forEach(([testname, { tags, expected }]) =>
  test(`flattenSupertags: ${testname}`, () => {
    expect(flattenSupertags(tags)).toEqual(expected)
  })
)

const serializeAllTagsCases: Record<string, { tags: Record<string, r34.QueryTag | r34.Supertag>; expected: string }> = {
  'with optionals': {
    tags: {
      supertag: { name: 'supertag', description: '', tags: { tag1: '+', tag2: '-' } },
      tag3: { modifier: '-', name: 'tag3' },
      tag4: { modifier: '~', name: 'tag4' },
      tag5: { modifier: '~', name: 'tag5' },
    },
    expected: 'tag1 + -tag2 + -tag3 + ( tag4 ~ tag5 )',
  },
  'without optionals': {
    tags: {
      supertag: { name: 'supertag', description: '', tags: { tag1: '+', tag2: '-', tag5: '+' } },
      tag3: { modifier: '-', name: 'tag3' },
      tag4: { modifier: '+', name: 'tag4' },
    },
    expected: 'tag1 + tag5 + tag4 + -tag2 + -tag3',
  },
  'no tags': {
    tags: {},
    expected: '',
  },
}

Object.entries(serializeAllTagsCases).forEach(([testname, { tags, expected }]) =>
  test(`serializeAllTags: ${testname}`, () => {
    expect(serializeAllTags(tags)).toEqual(expected)
  })
)

const getTagParameterCases: Record<string, { tags: Record<string, r34.QueryTag>; expected: string }> = {
  'with tags': {
    tags: {
      tag1: { modifier: '+', name: 'tag1' },
      tag2: { modifier: '+', name: 'tag2' },
    },
    expected: 'tag1 + tag2 + sort%3Adate%3Adesc',
  },
  'no tags': { tags: {}, expected: 'sort%3Adate%3Adesc' },
}

Object.entries(getTagParameterCases).forEach(([testname, { tags, expected }]) =>
  test(`serializeTag: ${testname}`, () => {
    expect(getTagParameter(tags, 0, 'date:desc')).toBe(expected)
  })
)
