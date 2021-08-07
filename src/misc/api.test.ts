import * as r34 from 'r34-types'
import { api } from './api'

beforeAll(() => {
  api.setTarget('local')
})

test(`buildPostUrl: no params/default params`, () => {
  expect(api.buildPostUrl(0, {})).toBe('http://localhost:8080/v2/posts?pid=0&limit=20')
})

test(`buildPostUrl: page number`, () => {
  expect(api.buildPostUrl(1, {})).toBe('http://localhost:8080/v2/posts?pid=1&limit=20')
})

test(`buildPostUrl: page size`, () => {
  expect(api.buildPostUrl(0, {}, { limit: 17 })).toBe('http://localhost:8080/v2/posts?pid=0&limit=17')
})

test(`buildPostUrl: sort`, () => {
  expect(api.buildPostUrl(0, {}, { sort: 'score' })).toBe(
    'http://localhost:8080/v2/posts?pid=0&limit=20&tags=sort%3Ascore%3Adesc'
  )
})

test(`buildPostUrl: minScore`, () => {
  expect(api.buildPostUrl(0, {}, { minScore: 40 })).toBe(
    'http://localhost:8080/v2/posts?pid=0&limit=20&tags=score%3A%3E%3D40'
  )
})

test(`buildPostUrl: hideSeen`, () => {
  expect(api.buildPostUrl(0, {}, { hideSeen: true })).toBe(
    'http://localhost:8080/v2/posts?pid=0&limit=20&hideSeen=true'
  )
})
