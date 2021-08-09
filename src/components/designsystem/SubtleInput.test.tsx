import { render, screen } from '@testing-library/react'
import { TestWrapper } from '../../data/testUtils'
import { NO_OP } from '../../data/types'
import { SubtleInput } from './SubtleInput'

test('SubtleInput: renders', () => {
  render(
    <TestWrapper withTheme>
      <SubtleInput type='text' value='example' onChange={NO_OP} />
    </TestWrapper>
  )

  expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('example')
})
