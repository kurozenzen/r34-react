import React from 'react'
import usePreference from '../../hooks/usePreference'
import Setting from '../common/Setting'
import { SmallNumberInput } from '../common/SmallInput'

export default function PrefPageSize() {
  const [pageSize, setPageSize] = usePreference('pageSize')

  return (
    <Setting title='Page size' description='Controls the number of posts loaded at once.'>
      <SmallNumberInput value={pageSize} onSubmit={setPageSize} />
    </Setting>
  )
}
