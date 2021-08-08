import React from 'react'
import styled from 'styled-components'
import { download } from '../../data/utils'
import { DownloadIcon, ExternalLinkIcon } from '../../icons/FontAwesomeIcons'
import { gutter, dropShadow } from '../../styled/mixins'

const Wrapper = styled.div`
  grid-area: 3/1/4/2;
  place-self: end stretch;
  display: flex;
  place-items: start center;
  ${gutter}

  > svg {
    ${dropShadow}
  }
`

const DownloadButton = styled(DownloadIcon)`
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
      <a href={fullSrc} target='_blank' rel='noopener noreferrer' aria-label='Open In New Tab' title={fullSrc}>
        <ExternalLinkIcon color='white' title='Open image in new tab' />
      </a>

      <DownloadButton color='white' aria-label='Download Image' onClick={handleDownload} title={fullSrc} />
    </Wrapper>
  )
}
