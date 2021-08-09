import { render, screen } from '@testing-library/react'
import { TestWrapper } from '../../data/testUtils'
import Setting from './Setting'

test('setting: renders', () => {
  render(
    <TestWrapper withTheme>
      <Setting title='My title' description='My descrition'>
        <div data-testid='setting-child'></div>
      </Setting>
    </TestWrapper>
  )

  expect(screen.getByText('My title')).toBeDefined()
  expect(screen.getByText('My descrition')).toBeDefined()
  expect(screen.getByTestId('setting-child')).toBeDefined()
})
