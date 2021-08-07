import { render, screen } from '@testing-library/react'
import { TestWrapper } from '../../data/testUtils'
import Options from './Options'

test('Options: renders', () => {
  render(
    <TestWrapper withTheme withStore>
      <Options />
    </TestWrapper>
  )

  expect(screen.getByTestId('options-wrapper')).toBeDefined()
})
