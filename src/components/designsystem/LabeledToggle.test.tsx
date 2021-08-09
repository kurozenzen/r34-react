import { render, screen } from '@testing-library/react'
import { TestWrapper } from '../../data/testUtils'
import LabeledToggle from './LabeledToggle'

test('labeled toggle: renders', () => {
  const handleToggle = jest.fn()
  render(
    <TestWrapper withTheme>
      <LabeledToggle value={false} onToggle={handleToggle}>
        My Toggle:
      </LabeledToggle>
    </TestWrapper>
  )

  expect(screen.getByText('My Toggle:')).toBeDefined()
  expect(screen.getByRole('checkbox')).toBeDefined()
})
