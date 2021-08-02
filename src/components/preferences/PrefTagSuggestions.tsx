import React from 'react'
import { PreferenceKey } from '../../data/types'
import usePreference from '../../hooks/usePreference'
import Setting from '../common/Setting'
import { SmallNumberInput } from '../common/SmallInput'

export default function PrefTagSuggestions() {
  const [tagSuggestionsCount, setTagSuggestionsCount] = usePreference(PreferenceKey.TAG_SUGGESTIONS_COUNT)

  return (
    <Setting
      title='Number of Tag suggestions'
      description='Controls the number of tags displayed when searching. Increase this when searching for niche tags.'
    >
      <SmallNumberInput value={tagSuggestionsCount} onSubmit={setTagSuggestionsCount} />
    </Setting>
  )
}
