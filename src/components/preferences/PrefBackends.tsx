import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import usePreference from '../../hooks/usePreference'
import { flexRowWithGap } from '../../styled/mixins/layout'
import Select from '../designsystem/Select'
import Setting from '../designsystem/Setting'
import { SmallTextInput } from '../designsystem/SmallInput'
import StatusImage from '../designsystem/StatusImage'
import { Faded } from '../designsystem/Text'

const TextInput = styled(SmallTextInput)`
  width: 100%;
`

const Message = styled(Faded)`
  ${flexRowWithGap};
`

const BACKEND_TYPES = {
  default: 'Default',
  adaptable: 'Adaptable',
  render: 'Render',
}

const BACKEND_URLS: Record<string, string[]> = {
  default: ['https://json-api.onrender.com'],
  adaptable: ['https://rule34-json-api.adaptable.app'],
  render: ['https://json-api.onrender.com'],
}

export default function PrefBackends() {
  const [backends, setBackends] = usePreference('backends')

  const preferedBackend = Object.keys(BACKEND_URLS).find(
    (key) => backends && BACKEND_URLS[key].includes(backends[0])
  ) as keyof typeof BACKEND_TYPES

  const onChange = useCallback(
    (event) => {
      const value: keyof typeof BACKEND_TYPES = event.target.value
      setBackends(BACKEND_URLS[value] ?? BACKEND_URLS.default)
    },
    [setBackends]
  )

  useEffect(() => {
    if(preferedBackend === undefined) {
      setBackends(BACKEND_URLS.default)
    }
  })

  return (
    <>
      <Setting title='Backend' description='Controls the backend used to fetch posts.'>
        <Select options={BACKEND_TYPES} value={preferedBackend ?? BACKEND_TYPES.default} onChange={onChange} />
      </Setting>
    </>
  )
}
