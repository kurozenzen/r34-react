import React from 'react'
import styled, { css } from 'styled-components'
import TagSelector from '../tagSelector/TagSelector'
import Options from './Options'
import { Title } from '../common/Text'
import Surface from '../common/Surface'
import SearchButton from './SearchButton'
import ActiveTags from './ActiveTags'

const ConfigWrapper = styled.section(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.dimensions.gutter};
    padding: ${theme.dimensions.gutter};
    width: 100%;
    max-width: ${theme.dimensions.bodyWidth};
    margin: auto;
  `
)

export default function Config(props: { onLoad: () => void }) {
  const { onLoad } = props

  return (
    <ConfigWrapper>
      <Title>
        <label htmlFor='tag-input'>Search</label>
      </Title>
      <Surface>
        <TagSelector />
        <ActiveTags onChange={onLoad} />
        <Options />
        <SearchButton />
      </Surface>
    </ConfigWrapper>
  )
}
