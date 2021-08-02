import React, { useCallback } from 'react'
import { PreferenceKey } from '../../data/types'
import usePreference from '../../hooks/usePreference'
import Setting from '../common/Setting'
import Toggle from '../common/Toggle'

export default function PrefHideSeenPosts() {
  const [hideSeen, setHideSeen] = usePreference(PreferenceKey.HIDE_SEEN)
  const toggleHideSeen = useCallback(() => setHideSeen(!hideSeen), [hideSeen, setHideSeen])

  return (
    <Setting
      title='Hide seen posts [NOT WORKING]'
      description='Enabling this option will hide all posts you have seen before. Perfect if you are frequently browsing the same tags or sorting by score.'
    >
      <Toggle value={hideSeen} onToggle={toggleHideSeen} />
    </Setting>
  )
}
