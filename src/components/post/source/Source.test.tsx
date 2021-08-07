import { render, screen } from '@testing-library/react'
import { TestWrapper } from '../../../data/testUtils'
import Source from './Source'

test('Source: renders text', () => {
  render(
    <TestWrapper withTheme>
      <Source value='source text' />
    </TestWrapper>
  )

  expect(screen.getByTestId('text-source').textContent).toBe('source text')
})

test('Source: renders link', () => {
  render(
    <TestWrapper withTheme>
      <Source value='http://localhost:8080/asdf' />
    </TestWrapper>
  )

  expect(screen.getByTestId('link-source').textContent).toBe('localhost:8080')
})

test('Source: renders known sources', () => {
  render(
    <TestWrapper withTheme>
      <Source value='https://patreon.com/asdf' />
    </TestWrapper>
  )

  expect(screen.getByTestId('known-source').textContent).toBe('asdf')
})

test('Source: all known sources', () => {
  render(
    <TestWrapper withTheme>
      <Source value='https://patreon.com/asdf https://patreon.com/posts/jkl https://tumblr.com/as82923nsasd https://discordapp.com/asdf https://twitter.com/hello https://pixiv.net/mal https://deviantart.com/deva' />
    </TestWrapper>
  )

  const sources = screen.getAllByTestId('known-source')

  expect(sources[0].textContent).toBe('asdf')
  expect(sources[1].textContent).toBe('jkl')
  expect(sources[2].textContent).toBe('tumblr')
  expect(sources[3].textContent).toBe('Discord')
  expect(sources[4].textContent).toBe('hello')
  expect(sources[5].textContent).toBe('Pixiv')
  expect(sources[6].textContent).toBe('deva')
})
