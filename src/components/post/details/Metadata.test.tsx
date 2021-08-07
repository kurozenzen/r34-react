import { render, screen } from '@testing-library/react'
import { TestWrapper } from '../../../data/testUtils'
import Metadata from './Metadata'

test('Metadata: renders', () => {
  render(
    <TestWrapper withTheme>
      <Metadata created_at='' status='active' id={1} width={16} height={9} />
    </TestWrapper>
  )

  expect(screen.getByTestId('id').textContent).toBe('1')
  expect(screen.getByTestId('status').textContent).toBe('active')
  expect(screen.getByTestId('date')).toBeDefined()
  expect(screen.getByTestId('size').textContent).toBe('16 x 9')
})
