import { render, screen } from '@testing-library/react'
import { TestWrapper } from '../../../data/testUtils'
import Rating from './Rating'

test('Metadata: renders', () => {
  render(
    <TestWrapper withTheme>
      <Rating value='s' />
    </TestWrapper>
  )

  expect(screen.getByTestId('rating').textContent).toBe('S')
})
