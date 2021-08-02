import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import TagDataClass from '../../data/TagDataClass'
import { Modifier } from '../../data/types'
import { removeSupertag, setTagsOfSupertag } from '../../firebase'
import { SupertagDetails } from '../../firebase/types'
import useToggle from '../../hooks/useToggle'
import { CloseIcon, SupertagIcon } from '../../icons/FontAwesomeIcons'
import { flexColumnWithGap, gridWithGap } from '../../styled/mixins'
import TagList from '../tag/TagList'
import TagSelector from '../tagSelector/TagSelector'
import { Faded } from './Text'

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

interface SuperTagEntryProps extends SupertagDetails {
  name: string
}

export default function SuperTagEntry(props: SuperTagEntryProps) {
  const { name, description, tags } = props

  const [isOpen, toggleOpen] = useToggle()
  const remove = useCallback(() => removeSupertag(name), [name])
  const addTag = useCallback(
    (tag: TagDataClass) => {
      const newTags = { ...tags, [tag.name]: tag.modifier as Modifier }
      setTagsOfSupertag(name, newTags)
    },
    [name, tags]
  )
  const removeTag = useCallback(
    (tag: TagDataClass) => {
      const newTags = { ...tags }
      delete newTags[tag.name]
      setTagsOfSupertag(name, newTags)
    },
    [name, tags]
  )
  const tagObjects = useMemo(
    () =>
      Object.entries(tags).reduce((result, [name, modifier]) => {
        result[name] = new TagDataClass(name, [], 0, modifier)
        return result
      }, {} as Record<string, TagDataClass>),
    [tags]
  )

  return (
    <Wrapper>
      <Row onClick={toggleOpen}>
        <SupertagIcon />
        <span>{name}</span>
        <Faded>{Object.keys(tags).length} tags</Faded>
        <Faded>{description}</Faded>
        <CloseIcon onClick={remove} />
      </Row>

      {isOpen && (
        <>
          <TagSelector onSubmit={addTag} />
          <TagList tags={tagObjects} detailed={false} onTagClick={removeTag}></TagList>
        </>
      )}
    </Wrapper>
  )
}