import { render, screen } from '@testing-library/react'
import TypeIcon from './TypeIcon'
import * as r34 from 'r34-types'

const irrelevantTypes: Array<r34.TagType | undefined> = [undefined, 'general', 'ambiguous']
irrelevantTypes.forEach((type) => {
  test(`TypeIcon: ${type}`, () => {
    const { container } = render(<TypeIcon type={type} />)
    expect(container.childNodes.length).toBe(0)
  })
})

const interestingTypes: r34.TagType[] = ['character', 'artist', 'copyright', 'rating', 'source', 'metadata', 'supertag']
interestingTypes.forEach((type) => {
  test(`TypeIcon: ${type}`, () => {
    render(<TypeIcon type={type} />)
    expect(screen.getByTestId('icon')).toBeDefined()
  })
})
