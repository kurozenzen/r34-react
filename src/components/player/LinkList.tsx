import React from 'react'
import styled, { css } from 'styled-components'
import { download } from '../../data/utils'
import { DownloadIcon, ExternalLinkIcon } from '../../icons/FontAwesomeIcons'
import { dropShadow, flexRowWithGap } from '../../styled/mixins'
import { InvisButton } from '../designsystem/Buttons'

const Wrapper = styled.div(
  ({ theme }) => css`
    grid-area: 3/1/4/2;
    ${flexRowWithGap}
    place-self: end start;
    place-items: start center;
  `
)

const LinkButton = styled.a(
  ({ theme }) => css`
    padding: ${theme.dimensions.gutter};
    cursor: pointer;
    ${dropShadow({ theme })}

    svg {
      transition: all ${theme.timings.transitionTime} ease-out;
    }
  `
)

const DownloadButton = styled(InvisButton)`
  cursor: pointer;
`

interface LinkListProps {
  fullSrc: string
}

export default function LinkList(props: LinkListProps) {
  const { fullSrc } = props

  const handleDownload = React.useCallback<React.MouseEventHandler>(
    (event) => {
      event.stopPropagation()
      download(fullSrc)
    },
    [fullSrc]
  )

  return (
    <Wrapper>
      <LinkButton href={fullSrc} target='_blank' rel='noopener noreferrer' aria-label='Open In New Tab' title={fullSrc}>
        <ExternalLinkIcon color='white' title='Open image in new tab' />
      </LinkButton>

      <DownloadButton aria-label='Download Image' onClick={handleDownload} title={fullSrc}>
        <DownloadIcon color='white' />
      </DownloadButton>
    </Wrapper>
  )
}
