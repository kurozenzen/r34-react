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
  local: 'Localhost',
  default: 'Default',
  heroku: 'Heroku',
  adaptable: 'Adaptable',
  render: 'Render',
  railway: 'Railway',
  custom: 'Custom',
}

const BACKEND_URLS: Record<string, string[]> = {
  local: ['http://localhost:8080'],
  default: ['https://r34-json.herokuapp.com'],
  heroku: ['https://r34-json.herokuapp.com'],
  adaptable: ['https://rule34-json-api.adaptable.app'],
  render: ['https://json-api.onrender.com'],
  railway: ['https://api-service-production-122b.up.railway.app'],
}

export default function PrefBackends() {
  const [backends, setBackends] = usePreference('backends')
  const [customUrl, setCustomUrl] = useState('https://your-backend.com')

  const [customBackendStatus, setCustomBackendStatus] = useState<boolean | undefined>(undefined)

  const backendType = (Object.keys(BACKEND_URLS).find((key) => backends && BACKEND_URLS[key].includes(backends[0])) ||
    'custom') as keyof typeof BACKEND_TYPES

  const onChange = useCallback(
    (event) => {
      const value = event.target.value
      if (value === 'custom') {
        setBackends([customUrl])
      } else {
        setBackends(BACKEND_URLS[value])
      }
    },
    [customUrl, setBackends]
  )

  const onSubmit = useCallback(
    (newUrl) => {
      setCustomUrl(newUrl)
      setBackends([customUrl])
    },
    [customUrl, setBackends]
  )

  useEffect(() => {
    if (backendType === 'custom') {
      try {
        setCustomBackendStatus(undefined)
        new URL(customUrl)

        fetch(customUrl)
          .then(() => setCustomBackendStatus(true))
          .catch(() => setCustomBackendStatus(false))
      } catch {
        // not a valid url
      }
    }
  }, [backendType, customUrl])

  return (
    <>
      <Setting
        title='Backend'
        description='Controls the backend used to fetch posts. This can be changed to use a custom backend.'
      >
        <Select options={BACKEND_TYPES} value={backendType} onChange={onChange} />
      </Setting>
      {backendType === 'custom' && (
        <>
          <TextInput value={customUrl} onSubmit={onSubmit} />
          {customBackendStatus !== undefined && (
            <Message>
              <StatusImage value={customBackendStatus} />
              {customBackendStatus ? 'Pinged custom backend successfully!' : 'Cannot reach custom backend.'}
            </Message>
          )}
        </>
      )}
    </>
  )
}
