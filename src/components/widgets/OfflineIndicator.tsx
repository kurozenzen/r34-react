import React from 'react'
import { useTheme } from 'styled-components'
import { useOnlineChange } from '../../hooks/useOnlineChange'
import { FailedIcon } from '../../icons/FontAwesomeIcons'

export default function OfflineIndicator() {
  const theme = useTheme()
  const isOnline = useOnlineChange()

  return isOnline ? <div></div> : <FailedIcon title='You are offline' color={theme.colors.negative} />
}
