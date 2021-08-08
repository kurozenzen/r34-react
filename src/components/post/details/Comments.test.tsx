import { render, screen } from '@testing-library/react'
import * as r34 from 'r34-types'
import { TestWrapper } from '../../../data/testUtils'
import Comments from './Comments'

const comments: r34.Comment[] = [
  {
    created_at: '01-01-2012',
    post_id: 1,
    body: 'hi',
    creator: 'me',
    id: 1,
    creator_id: 1,
    post_url: 'nothing',
  },
  {
    created_at: '02-01-2012',
    post_id: 1,
    body: 'again',
    creator: 'me',
    id: 2,
    creator_id: 1,
    post_url: 'nothing',
  },
]

test('Comments: renders', () => {
  render(
    <TestWrapper withTheme>
      <Comments comments={comments} />
    </TestWrapper>
  )

  expect(screen.getByText('hi')).toBeDefined()
  expect(screen.getByText('again')).toBeDefined()
  expect(screen.getAllByText('me').length).toBe(2)
})
