import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { RouteName } from '../../data/types'

import { ArrowUp } from '../../icons/FontAwesomeIcons'
import { BlockButton } from '../designsystem/Buttons'

export default function ScrollToTopButton() {
  const location = useLocation()

  if (location.pathname === RouteName.STORIES) {
    return <NavigateBackButton />
  } else {
    return <ScrollUpButton />
  }
}

function ScrollUpButton() {
  const scrollUp = React.useCallback(() => window.scrollTo(0, 0), [])

  return (
    <BlockButton onClick={scrollUp}>
      <ArrowUp /> Take me to the top
    </BlockButton>
  )
}

function NavigateBackButton() {
  return (
    <Link to={RouteName.SEARCH}>
      <BlockButton>
        <ArrowUp /> Take me to the top
      </BlockButton>
    </Link>
  )
}
