import React from 'react'
import styled from 'styled-components'
import TagSelector from '../tagSelector/TagSelector'
import Options from './Options'
import { Title } from '../common/Text'
import Surface from '../common/Surface'
import SearchButton from '../widgets/SearchButton'
import ActiveTags from '../widgets/ActiveTags'
import { flexColumn, gutter, centeredMaxWidth } from '../../styled/mixins'

const ConfigWrapper = styled.section`
  ${flexColumn}
  ${gutter}
  ${centeredMaxWidth}
`

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
