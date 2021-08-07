import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { addSupertag } from '../../firebase'
import { selectActiveTags } from '../../redux/selectors'
import { defaultBlock, defaultBorder } from '../../styled/mixins'
import { BlockButton } from '../common/Buttons'
import { HorizontalLine } from '../common/Lines'
import Surface from '../common/Surface'
import { Title } from '../common/Text'
import TagSelector from '../tagSelector/TagSelector'
import ActiveTags from './ActiveTags'
import * as r34 from 'r34-types'
import { isSupertag } from '../../data/tagUtils'
import { useActivateTag } from '../../hooks/useActivateTag'
import { removeTag } from '../../redux/actions'

const Wrapper = styled.div`
  position: fixed;
  display: grid;
  place-items: center;

  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;

  z-index: 1000;

  background: #000000d0;
`

const ModalSurface = styled(Surface)`
  max-width: 500px;
  background-color: ${(props) => props.theme.colors.layerBgSolid};
`

const StyledInput = styled.input(
  ({ theme }) => css`
    ${defaultBorder}
    background-color: ${theme.colors.backgroundColor2};
    ${defaultBlock}
    text-align: left;
  `
)

interface SupertagModalProps {
  onClose: () => void
}

export default function SupertagModal(props: SupertagModalProps) {
  const { onClose } = props
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const activeTags = useSelector(selectActiveTags)
  const dispatch = useDispatch()
  const activateTag = useActivateTag()

  const tags: Record<string, r34.TagModifier> = Object.values(activeTags)
    .filter((tag): tag is r34.BiasedTag => !isSupertag(tag))
    .reduce((result, tag) => ({ ...result, [tag.name]: tag.modifier }), {})

  const handleCreate = useCallback(() => {
    addSupertag(name, description, tags)
      .then(() => {
        Object.keys(tags).forEach((tagname) => dispatch(removeTag(tagname)))
        activateTag({ name, description, tags })
      })
      .catch(() => console.log('Failed to create supertag'))
    onClose()
  }, [activateTag, description, dispatch, name, onClose, tags])

  return (
    <Wrapper onClick={onClose}>
      <ModalSurface onClick={(e) => e.stopPropagation()}>
        <Title>Create Supertag</Title>
        <HorizontalLine />
        <StyledInput type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <StyledInput
          type='text'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TagSelector showSupertags={false} onSubmit={activateTag} />
        <ActiveTags />
        <BlockButton onClick={handleCreate}>Create</BlockButton>
      </ModalSurface>
    </Wrapper>
  )
}
