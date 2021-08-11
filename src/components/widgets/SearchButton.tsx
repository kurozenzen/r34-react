import React from 'react'
import useAction from '../../hooks/useAction'
import { SearchIcon } from '../../icons/FontAwesomeIcons'
import { getResults, openModal } from '../../redux/actions'
import { BlockButton } from '../designsystem/Buttons'
import { ModalId } from '../../data/types'
import { useConnectionState } from '../../hooks/useConnectionState'
import { selectAutoPlay, selectOriginals, selectPreloadVideos } from '../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'

let isUserNotified = false

export default function SearchButton() {
  const search = useAction(getResults)
  const dispatch = useDispatch()
  const connection = useConnectionState()
  const preloadVideos = useSelector(selectPreloadVideos)
  const autoplay = useSelector(selectAutoPlay)
  const originals = useSelector(selectOriginals)

  const handleClick = React.useCallback(() => {
    const riskyFeatureEnabled = preloadVideos || autoplay || originals

    if (!isUserNotified && connection === 'cellular' && riskyFeatureEnabled) {
      dispatch(openModal(ModalId.CELLULAR_WARNING))
      isUserNotified = true
    } else {
      search()
    }
  }, [autoplay, connection, dispatch, originals, preloadVideos, search])

  return (
    <BlockButton onClick={handleClick} aria-label='Search'>
      <SearchIcon />
      Search
    </BlockButton>
  )
}
