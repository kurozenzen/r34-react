import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ModalId, NO_OP } from '../../data/types'
import { useCheckIsActive } from '../../hooks/useCheckIsActive'
import useToggleTag from '../../hooks/useToggleTag'
import { SupertagIcon } from '../../icons/FontAwesomeIcons'
import { openModal } from '../../redux/actions'
import { selectActiveTags, selectNumberOfActiveTags } from '../../redux/selectors'
import { RedButton } from '../common/Buttons'
import TagList from '../tag/TagList'

interface ActiveTagsProps {
  onChange?: () => void
  offerSupertags?: boolean
}

export default function ActiveTags(props: ActiveTagsProps) {
  const { onChange = NO_OP, offerSupertags = false } = props

  const dispatch = useDispatch()

  const activeTags = useSelector(selectActiveTags)
  const numberOfActiveTags = useSelector(selectNumberOfActiveTags)
  const openSupertagModal = useCallback(() => dispatch(openModal(ModalId.CREATE_SUPERTAG)), [dispatch])

  const toggleTag = useToggleTag()
  const checkIsActive = useCheckIsActive()

  // Fire change event when tags change
  // This is used to re-measure the height
  useEffect(() => onChange(), [onChange, activeTags])

  return numberOfActiveTags > 0 ? (
    <TagList tags={activeTags} detailed={true} onTagClick={toggleTag} getIsActive={checkIsActive}>
      {offerSupertags && Object.keys(activeTags).length > 1 && (
        <RedButton onClick={openSupertagModal} title='Create a supertag'>
          <SupertagIcon />
        </RedButton>
      )}
    </TagList>
  ) : null
}
