import React from 'react'
import styled from 'styled-components'
import { FailedIcon, SuccessIcon } from '../../icons/FontAwesomeIcons'

const Positive = styled(SuccessIcon).attrs((props) => ({
  color: props.theme.colors.positive,
}))``

const Negative = styled(FailedIcon).attrs((props) => ({
  color: props.theme.colors.negative,
}))``

type StatusImageProps = {
  value: boolean
}

export default function StatusImage(props: StatusImageProps) {
  return props.value ? <Positive /> : <Negative />
}
