import { searchEvent } from './events'

test('constructs event object', () => {
  expect(searchEvent(5)).toEqual({
    id: 'r34_search',
    payload: {
      page_number: 5,
    },
  })
})
