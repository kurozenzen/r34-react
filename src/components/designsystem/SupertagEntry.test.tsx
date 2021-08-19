import { fireEvent, render, screen } from '@testing-library/react'
import { TestWrapper } from '../../data/testUtils'
import SupertagEntry from './SupertagEntry'

test('SupertagEntry: renders', () => {
  render(
    <TestWrapper withTheme withRouter>
      <SupertagEntry supertag={{ name: 'my supertag', description: 'a cool desc', tags: { 'tag 1': '+' } }} />
    </TestWrapper>
  )

  expect(screen.getByText('my supertag')).toBeDefined()
  expect(screen.getByText('a cool desc')).toBeDefined()
})

test('SupertagEntry: open', () => {
  render(
    <TestWrapper withTheme withStore withRouter>
      <SupertagEntry
        supertag={{ name: 'my supertag', description: 'a cool desc', tags: { 'tag 1': '+', 'tag 2': '+' } }}
      />
    </TestWrapper>
  )

  fireEvent.click(screen.getByText('my supertag'))

  expect(screen.getByText('tag 1')).toBeDefined()
  expect(screen.getByText('tag 2')).toBeDefined()
})
