import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectActiveTags, selectNumberOfActiveTags } from '../../redux/selectors'
import TagList from '../tag/TagList'

interface ActiveTagsProps {
  onChange: () => void
}

export default function ActiveTags(props: ActiveTagsProps) {
  const { onChange } = props

  const activeTags = useSelector(selectActiveTags)
  const numberOfActiveTags = useSelector(selectNumberOfActiveTags)

  // Fire change event when tags change
  // This is used to re-measure the height
  useEffect(() => onChange(), [onChange, activeTags])

  return numberOfActiveTags > 0 ? <TagList tags={activeTags} detailed={true} /> : null
}
