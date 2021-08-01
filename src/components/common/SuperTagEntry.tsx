import React, { useCallback } from 'react'
import styled from 'styled-components'
import { removeSupertag } from '../../firebase'
import { SupertagDetails } from '../../firebase/types'
import { CloseIcon, SupertagIcon } from '../../icons/FontAwesomeIcons'
import { gridWithGap } from '../../styled/mixins'
import { Faded } from './Text'

const Wrapper = styled.div`
  ${gridWithGap}
  grid-template-columns: auto auto 1fr auto;
  grid-template-rows: 1fr auto;
  align-items: center;
  padding: ${(props) => props.theme.dimensions.gutter};

  :not(:last-child) {
    border-bottom: solid gray 1px;
  }

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

  const remove = useCallback(() => removeSupertag(name), [name])

  return (
    <Wrapper>
      <SupertagIcon />
      <span>{name}</span>
      <Faded>{Object.keys(tags).length} tags</Faded>
      <Faded>{description}</Faded>
      <CloseIcon onClick={remove} />
    </Wrapper>
  )
}
