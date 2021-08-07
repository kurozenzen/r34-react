import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getDefaultPost, getStore, TestWrapper } from '../../../data/testUtils'
import { setPosts } from '../../../redux/actions'
import Score from './Score'

beforeAll(() => {
  getStore().dispatch(setPosts([getDefaultPost()], 1, 0))
})

test('Score: renders and increments once', () => {
  render(
    <TestWrapper withTheme withStore>
      <Score value={0} postId={1} />
    </TestWrapper>
  )

  const score = screen.getByTestId('score')

  // renders
  expect(score.textContent).toBe('0')

  // increments
  userEvent.click(score)
  expect(score.textContent).toBe('1')

  // only once
  userEvent.click(score)
  expect(score.textContent).toBe('1')
})
