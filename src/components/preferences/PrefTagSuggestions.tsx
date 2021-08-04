import React from 'react'
import usePreference from '../../hooks/usePreference'
import Setting from '../common/Setting'
import { SmallNumberInput } from '../common/SmallInput'

export default function PrefTagSuggestions() {
  const [tagSuggestionsCount, setTagSuggestionsCount] = usePreference('tagSuggestionsCount')

  return (
    <Setting
      title='Number of Tag suggestions'
      description='Controls the number of tags displayed when searching. Increase this when searching for niche tags.'
    >
      <SmallNumberInput value={tagSuggestionsCount} onSubmit={setTagSuggestionsCount} />
    </Setting>
  )
}
