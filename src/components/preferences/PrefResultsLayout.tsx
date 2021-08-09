import React, { useCallback } from 'react'
import { ResultsLayout } from 'r34-types'
import usePreference from '../../hooks/usePreference'
import Select from '../designsystem/Select'
import Setting from '../designsystem/Setting'

const layouts: Record<ResultsLayout, string> = {
  infinite_column: 'Infinite',
  pages: 'Pages',
}

export default function PrefResultsLayout() {
  const [resultsLayout, setResultsLayout] = usePreference('resultsLayout')
  const onChangeResultsLayout = useCallback((event) => setResultsLayout(event.target.value), [setResultsLayout])

  return (
    <Setting title='Results Layout' description='Choose how your results are displayed.'>
      <Select options={layouts} value={resultsLayout} onChange={onChangeResultsLayout} />
    </Setting>
  )
}
