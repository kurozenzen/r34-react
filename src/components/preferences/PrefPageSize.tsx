import React from 'react'
import usePreference from '../../hooks/usePreference'
import Setting from '../designsystem/Setting'
import { SmallNumberInput } from '../designsystem/SmallInput'

export default function PrefPageSize() {
  const [pageSize, setPageSize] = usePreference('pageSize')

  return (
    <Setting title='Page size' description='Controls the number of posts loaded at once.'>
      <SmallNumberInput value={pageSize} onSubmit={setPageSize} min={10} max={200} step={1} />
    </Setting>
  )
}
