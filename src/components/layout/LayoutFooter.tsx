import React from 'react'
import { NO_OP } from '../../data/types'
import Footer from '../features/Footer'
import LayoutElementProps from './LayoutElementProps'

export default function LayoutFooter({ onLoad = NO_OP, virtualRef, style }: LayoutElementProps) {
  return (
    <div onLoad={onLoad} ref={virtualRef} style={style} role='row'>
      <Footer />
    </div>
  )
}
