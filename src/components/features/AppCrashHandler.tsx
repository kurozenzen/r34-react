import React from 'react'

interface AppCrashHandlerProps {
  fallback: JSX.Element
  children: JSX.Element
}

interface AppCrashHandlerState {
  hasError: boolean
}

export default class AppCrashHandler extends React.Component<AppCrashHandlerProps, AppCrashHandlerState> {
  constructor(props: AppCrashHandlerProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    console.log('hi')
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
