import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { Modifier } from '../../data/types'
import { addSupertag } from '../../firebase'
import { selectActiveTags } from '../../redux/selectors'
import { defaultBlock, defaultBorder } from '../../styled/mixins'
import { BlockButton } from '../common/Buttons'
import { HorizontalLine } from '../common/Lines'
import Surface from '../common/Surface'
import { Title } from '../common/Text'
import TagSelector from '../tagSelector/TagSelector'
import ActiveTags from './ActiveTags'

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
  const [desc, setDesc] = useState('')
  const activeTags = useSelector(selectActiveTags)

  const tags: Record<string, Modifier> = Object.entries(activeTags).reduce(
    (result, [name, tag]) => ({ ...result, [name]: tag.modifier }),
    {}
  )

  const handleCreateTagList = useCallback(() => {
    addSupertag(name, desc, tags)
    onClose()
  }, [desc, name, onClose, tags])

  return (
    <Wrapper onClick={onClose}>
      <ModalSurface onClick={(e) => e.stopPropagation()}>
        <Title>Create Supertag</Title>
        <HorizontalLine />
        <StyledInput type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <StyledInput type='text' placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)} />
        <TagSelector />
        <ActiveTags />
        <BlockButton onClick={handleCreateTagList}>Create</BlockButton>
      </ModalSurface>
    </Wrapper>
  )
}
