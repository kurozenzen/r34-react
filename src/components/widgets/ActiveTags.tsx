import React, { useCallback, useEffect } from 'react'
import * as r34 from 'r34-types'
import { useDispatch, useSelector } from 'react-redux'
import { isSupertag } from '../../data/tagUtils'
import { ModalId, NO_OP } from '../../data/types'
import { useCheckIsActive } from '../../hooks/useCheckIsActive'
import useToggleTag from '../../hooks/useToggleTag'
import { SupertagIcon } from '../../icons/FontAwesomeIcons'
import { addTag, openModal } from '../../redux/actions'
import { selectActiveTags, selectNumberOfActiveTags } from '../../redux/selectors'
import { PrimaryButton } from '../designsystem/Buttons'
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

  const onTagMenu = React.useCallback(
    (tag: r34.AnyBiasedTag) => {
      if (!isSupertag(tag)) {
        const order: r34.TagModifier[] = ['+', '-', '~']
        const nextModifer = order[(order.indexOf(tag.modifier) + 1) % 3]
        dispatch(addTag({ ...tag, modifier: nextModifer }))
      }
    },
    [dispatch]
  )

  // Fire change event when tags change
  // This is used to re-measure the height
  useEffect(() => onChange(), [onChange, activeTags])

  return numberOfActiveTags > 0 ? (
    <TagList tags={activeTags} onTagClick={toggleTag} getIsActive={checkIsActive} onTagMenu={onTagMenu} detailed>
      {offerSupertags && Object.keys(activeTags).length > 1 && (
        <PrimaryButton onClick={openSupertagModal} title='Create a supertag'>
          <SupertagIcon />
        </PrimaryButton>
      )}
    </TagList>
  ) : null
}
