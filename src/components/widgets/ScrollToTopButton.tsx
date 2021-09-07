import React from 'react'

import { ArrowUp } from '../../icons/FontAwesomeIcons'
import { BlockButton } from '../designsystem/Buttons'

export default function ScrollToTopButton() {
  const scrollUp = React.useCallback(() => window.scrollTo(0, 0), [])

  return (
    <BlockButton onClick={scrollUp}>
      <ArrowUp /> Take me to the top
    </BlockButton>
  )
}
