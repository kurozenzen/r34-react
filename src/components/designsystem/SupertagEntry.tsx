import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import useToggle from '../../hooks/useToggle'
import { CloseIcon, ShareIcon, SupertagIcon } from '../../icons/FontAwesomeIcons'
import TagList from '../tag/TagList'
import TagSelector from '../tagSelector/TagSelector'
import { Faded } from './Text'
import * as r34 from 'r34-types'
import { useSupertag } from '../../hooks/useSupertag'
import { Link } from 'react-router-dom'
import { RouteName } from '../../data/types'
import { encodeSupertag, isSupertag } from '../../data/tagUtils'
import { InvisButton } from './Buttons'
import { flexColumnWithGap, gridWithGap } from '../../styled/mixins/layout'

const Wrapper = styled.div(
  ({ theme }) => css`
    ${flexColumnWithGap}

    padding-block: ${theme.dimensions.bigSpacing};

    :not(:last-child) {
      border-bottom: solid gray 1px;
    }

    :active {
      background: ${theme.colors.layerBgHighlight};
    }
  `
)

const Row = styled.div`
  ${gridWithGap}
  grid-template-columns: auto auto 1fr auto auto;
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
  > :nth-child(6) {
    grid-area: 1/6/3/6;
  }
`

const LinkButton = styled(Link)(
  ({ theme }) => css`
    padding: ${theme.dimensions.bigSpacing};
    cursor: pointer;
    color: ${theme.colors.text};
  `
)

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

  const handleRemove = React.useCallback(
    (event) => {
      event.stopPropagation()
      event.preventDefault()
      deleteSupertag()
    },
    [deleteSupertag]
  )

  const onTagMenu = React.useCallback(
    (tag: r34.AnyBiasedTag) => {
      if (!isSupertag(tag)) {
        const order: r34.TagModifier[] = ['+', '-', '~']
        const nextModifer = order[(order.indexOf(tag.modifier) + 1) % 3]
        addTag({ ...tag, modifier: nextModifer })
      }
    },
    [addTag]
  )

  return (
    <Wrapper>
      <Row onClick={toggleOpen} title='Open supertag details'>
        <SupertagIcon />
        <span>{name}</span>
        <Faded>{Object.keys(tags).length} tags</Faded>
        <Faded>{description}</Faded>
        <LinkButton to={`${RouteName.SHARE}?${encodeSupertag(supertag)}`} title='Share supertag'>
          <ShareIcon />
        </LinkButton>
        <InvisButton onClick={handleRemove} title='Delete supertag'>
          <CloseIcon />
        </InvisButton>
      </Row>

      {isOpen && (
        <>
          <TagSelector onSubmit={addTag} showSupertags={false} />
          <TagList tags={tagObjects} detailed={false} onTagClick={removeTag} onTagMenu={onTagMenu}></TagList>
        </>
      )}
    </Wrapper>
  )
}
