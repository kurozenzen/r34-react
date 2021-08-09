import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TestWrapper } from '../../data/testUtils'
import { NO_OP } from '../../data/types'
import { SmallNumberInput, SmallTextInput } from './SmallInput'

test('numberinput: renders', () => {
  render(
    <TestWrapper withTheme>
      <SmallNumberInput value={5} onSubmit={NO_OP} />
    </TestWrapper>
  )

  expect((screen.getByRole('spinbutton') as HTMLInputElement).value).toBe('5')
})

test('textinput: renders', () => {
  render(
    <TestWrapper withTheme>
      <SmallTextInput value={'text'} onSubmit={NO_OP} />
    </TestWrapper>
  )

  expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('text')
})

test('textinput: type', () => {
  let text = ''
  const onSubmit = jest.fn()

  render(
    <TestWrapper withTheme>
      <SmallTextInput value={text} onSubmit={onSubmit} />
    </TestWrapper>
  )

  const input = screen.getByRole('textbox') as HTMLInputElement

  userEvent.click(input)
  userEvent.type(input, 'text')
  expect(input.value).toBe('text')
  expect(onSubmit).toHaveBeenCalledTimes(0)

  fireEvent.blur(input)
  expect(onSubmit).toHaveBeenCalledTimes(1)
})

test('numberinput: type', () => {
  let value = 0
  const onSubmit = jest.fn()

  render(
    <TestWrapper withTheme>
      <SmallNumberInput value={value} onSubmit={onSubmit} />
    </TestWrapper>
  )

  const input = screen.getByRole('spinbutton') as HTMLInputElement

  fireEvent.click(input)
  userEvent.type(input, '123')
  expect(input.value).toBe('0123')
  expect(onSubmit).toHaveBeenCalledTimes(0)

  fireEvent.blur(input)
  expect(onSubmit).toHaveBeenCalledTimes(1)
})

test('textinput: enter to blur', () => {
  render(
    <TestWrapper withTheme>
      <SmallTextInput value={'text'} onSubmit={NO_OP} />
    </TestWrapper>
  )

  const input = screen.getByRole('textbox') as HTMLInputElement

  userEvent.click(input)
  expect(input).toHaveFocus()

  userEvent.type(input, '{enter}')
  expect(input).not.toHaveFocus()
})

test('numberinput: enter to blur', () => {
  render(
    <TestWrapper withTheme>
      <SmallNumberInput value={0} onSubmit={NO_OP} />
    </TestWrapper>
  )

  const input = screen.getByRole('spinbutton') as HTMLInputElement

  userEvent.click(input)
  expect(input).toHaveFocus()

  userEvent.type(input, '{enter}')
  expect(input).not.toHaveFocus()
})
