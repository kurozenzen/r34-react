import { render, screen } from '@testing-library/react'
import { getDefaultPost, getStore, TestWrapper, mockIntersectionObserver } from '../../data/testUtils'
import { setPosts } from '../../redux/actions'
import Player from './Player'

mockIntersectionObserver()

beforeAll(() => {
  getStore().dispatch(setPosts([getDefaultPost()], 1, 0))
})

test('Player: image', () => {
  render(
    <TestWrapper withTheme withStore>
      <Player type='image' postId={1} src='' thumbnail_src='' width={1} height={1} />
    </TestWrapper>
  )

  expect(screen.getByTestId('image')).toBeDefined()
  expect(screen.getByTestId('overlay-wrapper')).toBeDefined()
})

test('Player: video', () => {
  render(
    <TestWrapper withTheme withStore>
      <Player type='video' postId={1} src='' thumbnail_src='' width={1} height={1} />
    </TestWrapper>
  )

  expect(screen.getByTestId('video')).toBeDefined()
  expect(screen.getByTestId('overlay-wrapper')).toBeDefined()
})

test('Player: gif', () => {
  render(
    <TestWrapper withTheme withStore>
      <Player type='gif' postId={1} src='' thumbnail_src='' width={1} height={1} />
    </TestWrapper>
  )

  expect(screen.getByTestId('gif')).toBeDefined()
  expect(screen.getByTestId('overlay-wrapper')).toBeDefined()
})
