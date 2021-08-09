import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TestWrapper } from '../../data/testUtils'
import Select from './Select'

test('select: renders', () => {
  const handleChange = jest.fn()
  const options = {
    a: 'Option A',
    b: 'Option B',
  }

  render(
    <TestWrapper withTheme>
      <Select options={options} value='a' onChange={handleChange} />
    </TestWrapper>
  )

  expect(screen.getByText('Option A')).toBeDefined()

  userEvent.selectOptions(screen.getByRole('combobox'), 'b')

  expect(screen.getByText('Option B')).toBeDefined()
})
