import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NO_OP } from '../../data/types'
import { SupertagIcon } from '../../icons/FontAwesomeIcons'
import { selectActiveTags, selectNumberOfActiveTags } from '../../redux/selectors'
import { RedButton } from '../common/Buttons'
import TagList from '../tag/TagList'
import SupertagModal from './SupertagModal'

interface ActiveTagsProps {
  onChange?: () => void
  offerSupertags?: boolean
}

export default function ActiveTags(props: ActiveTagsProps) {
  const { onChange = NO_OP, offerSupertags = false } = props

  const [isModalOpen, setModalOpen] = useState(false)

  const activeTags = useSelector(selectActiveTags)
  const numberOfActiveTags = useSelector(selectNumberOfActiveTags)

  const openModal = useCallback(() => {
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  // Fire change event when tags change
  // This is used to re-measure the height
  useEffect(() => onChange(), [onChange, activeTags])

  return numberOfActiveTags > 0 ? (
    <TagList tags={activeTags} detailed={true}>
      {offerSupertags && Object.keys(activeTags).length > 1 && (
        <RedButton onClick={openModal} title='Create a supertag'>
          <SupertagIcon />
        </RedButton>
      )}
      {isModalOpen && <SupertagModal onClose={closeModal} />}
    </TagList>
  ) : null
}
