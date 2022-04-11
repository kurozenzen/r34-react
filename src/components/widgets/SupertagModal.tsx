import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { addSupertag } from '../../client/firebase'
import { selectActiveTags } from '../../redux/selectors'
import { defaultBorder } from '../../styled/mixins/theming'
import { BlockButton } from '../designsystem/Buttons'
import { HorizontalLine } from '../designsystem/Lines'
import { Title } from '../designsystem/Text'
import TagSelector from '../tagSelector/TagSelector'
import ActiveTags from './ActiveTags'
import * as r34 from 'r34-types'
import { isSupertag } from '../../data/tagUtils'
import { useActivateTag } from '../../hooks/useActivateTag'
import { closeModal, removeTag } from '../../redux/actions'
import useAction from '../../hooks/useAction'
import Modal from '../designsystem/Modal'
import { defaultBlock } from '../../styled/mixins/layout'

const StyledInput = styled.input(
  ({ theme }) => css`
    ${defaultBorder}
    background-color: ${theme.colors.backgroundColor2};
    ${defaultBlock}
    text-align: left;
  `
)

export default function SupertagModal() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const activeTags = useSelector(selectActiveTags)
  const dispatch = useDispatch()
  const activateTag = useActivateTag()
  const close = useAction(closeModal)

  const tags: Record<string, r34.TagModifier> = Object.values(activeTags)
    .filter((tag): tag is r34.BiasedTag => !isSupertag(tag))
    .reduce((result, tag) => ({ ...result, [tag.name]: tag.modifier }), {})

  const handleCreate = useCallback(() => {
    addSupertag(name, description, tags)
      .then(() => {
        Object.keys(tags).forEach((tagname) => dispatch(removeTag(tagname)))
        activateTag({ name, description, tags })
        close()
      })
      .catch((err) => console.error('Failed to create supertag', err))
  }, [activateTag, close, description, dispatch, name, tags])

  return (
    <Modal>
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
    </Modal>
  )
}
