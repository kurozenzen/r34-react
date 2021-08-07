import React, { useMemo } from 'react'
import styled from 'styled-components'
import useToggle from '../../hooks/useToggle'
import { CloseIcon, SupertagIcon } from '../../icons/FontAwesomeIcons'
import { flexColumnWithGap, gridWithGap } from '../../styled/mixins'
import TagList from '../tag/TagList'
import TagSelector from '../tagSelector/TagSelector'
import { Faded } from './Text'
import * as r34 from 'r34-types'
import { useSupertag } from '../../hooks/useSupertag'

const Wrapper = styled.div`
  ${flexColumnWithGap}

  padding: ${(props) => props.theme.dimensions.gutter};

  :not(:last-child) {
    border-bottom: solid gray 1px;
  }

  :active {
    background: ${(props) => props.theme.colors.layerBgHighlight};
  }
`

const Row = styled.div`
  ${gridWithGap}
  grid-template-columns: auto auto 1fr auto;
  grid-template-rows: 1fr auto;
  align-items: center;
  cursor: pointer;

  > :first-child {
    place-items: center;
    grid-area: 1/1/3/2;
  }
  > :nth-child(2) {
    grid-area: 1/2/2/3;
  }
  > :nth-child(3) {
    grid-area: 1/3/2/4;
  }
  > :nth-child(4) {
    grid-area: 2/2/3/4;
  }
  > :nth-child(5) {
    grid-area: 1/4/3/5;
  }
`

interface SupertagEntryProps {
  supertag: r34.Supertag
}

export default function SupertagEntry(props: SupertagEntryProps) {
  const { supertag } = props
  const { name, description, tags } = supertag

  const [isOpen, toggleOpen] = useToggle()
  const [addTag, removeTag, deleteSupertag] = useSupertag(supertag)

  const tagObjects = useMemo(
    () =>
      Object.entries(tags).reduce((result, [name, modifier]) => {
        result[name] = { name, modifier, types: [] }
        return result
      }, {} as Record<string, Omit<r34.BiasedTag, 'count'>>),
    [tags]
  )

  return (
    <Wrapper>
      <Row onClick={toggleOpen}>
        <SupertagIcon />
        <span>{name}</span>
        <Faded>{Object.keys(tags).length} tags</Faded>
        <Faded>{description}</Faded>
        <CloseIcon onClick={deleteSupertag} />
      </Row>

      {isOpen && (
        <>
          <TagSelector onSubmit={addTag} showSupertags={false} />
          <TagList tags={tagObjects} detailed={false} onTagClick={removeTag}></TagList>
        </>
      )}
    </Wrapper>
  )
}
