import React from 'react'
import styled, { css } from 'styled-components'
import { PatreonIcon } from '../../icons/FontAwesomeIcons'
import { flexRowGap } from '../../styled/mixins'

export const AButton = styled.a(
  ({ theme }) => css`
    height: 36px;
    display: inline-flex;
    align-items: center;
    ${flexRowGap(theme.dimensions.bigSpacing)}
    background-color: ${theme.colors.layerBg};
    padding: 0 ${theme.dimensions.hugeSpacing};
    border-radius: ${theme.dimensions.borderRadius};
    color: ${theme.colors.text};
    cursor: pointer;
    font-family: 'Quicksand', Helvetica, Century Gothic, sans-serif !important;
    font-weight: 700;
    font-size: 14px;
    white-space: nowrap;

    :visited {
      color: ${theme.colors.text} !important;
      text-decoration: none !important;
    }

    :hover {
      opacity: 0.8;
      text-decoration: none !important;
    }

    :active {
      opacity: 0.6;
      text-decoration: none !important;
    }
  `
)

const Image = styled.img`
  height: 13px !important;
  width: 20px !important;
`

interface KofiButtonProps {
  id: string
  label: string
}

export function KofiButton(props: KofiButtonProps) {
  const { id, label } = props

  return (
    <AButton title={label} href={`https://ko-fi.com/${id}`} target='_blank' rel='noopener noreferrer'>
      <Image src='https://ko-fi.com/img/cup-border.png' className='kofiimg' alt='Ko-Fi button' />
      <span>{label}</span>
    </AButton>
  )
}

interface PatreonButtonProps {
  name: string
  label: string
}

export function PatreonButton(props: PatreonButtonProps) {
  const { name, label } = props

  return (
    <AButton title={label} href={`https://www.patreon.com/${name}`} target='_blank' rel='noopener noreferrer'>
      <PatreonIcon color='currentcolor' />
      <span>{label}</span>
    </AButton>
  )
}

export const RandomSponsoring = React.memo(() => {
  return Math.floor(Math.random() * 2) < 1 ? (
    <KofiButton id='V7V73PWW9' label='Support me on Ko-fi' />
  ) : (
    <PatreonButton name='kurozenzen' label='Support me on Patreon' />
  )
})
