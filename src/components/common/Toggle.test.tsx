import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TestWrapper } from '../../data/testUtils'
import Toggle from './Toggle'

test('Toggle: triggers onToggle', () => {
  const handleToggle = jest.fn()

  render(
    <TestWrapper withTheme>
      <Toggle value={false} onToggle={handleToggle} />
    </TestWrapper>
  )

  const toggle = screen.getByRole('checkbox')

  expect(toggle).toBeDefined()

  expect(handleToggle).toHaveBeenCalledTimes(0)

  userEvent.click(toggle)

  expect(handleToggle).toHaveBeenCalledTimes(1)
})
