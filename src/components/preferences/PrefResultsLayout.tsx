import React, { useCallback } from 'react'
import { ResultLayout, PreferenceKey } from '../../data/types'
import usePreference from '../../hooks/usePreference'
import Select from '../common/Select'
import Setting from '../common/Setting'

const layouts = {
  [ResultLayout.INFINITE_COLUMN]: 'Infinite',
  [ResultLayout.PAGES]: 'Pages',
}

export default function PrefResultsLayout() {
  const [resultsLayout, setResultsLayout] = usePreference(PreferenceKey.RESULTS_LAYOUT)
  const onChangeResultsLayout = useCallback((event) => setResultsLayout(event.target.value), [setResultsLayout])

  return (
    <Setting title='Results Layout' description='Choose how your results are displayed.'>
      <Select options={layouts} value={resultsLayout} onChange={onChangeResultsLayout} />
    </Setting>
  )
}
